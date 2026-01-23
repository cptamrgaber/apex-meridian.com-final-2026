import { getDb } from '../db';
import { sql } from 'drizzle-orm';
import { notifyOwner } from '../_core/notification';

export interface LeadScore {
  userEmail: string;
  totalScore: number;
  lastActivity: Date;
  activities: {
    assessmentCompletions: number;
    whitepaperDownloads: number;
    personaSelections: number;
    resourceDownloads: number;
  };
}

// Scoring weights
const SCORING_WEIGHTS = {
  ASSESSMENT_COMPLETION: 50,
  WHITEPAPER_DOWNLOAD: 30,
  PERSONA_SELECTION: 10,
  RESOURCE_DOWNLOAD: 5,
};

// High-value lead threshold
const HIGH_VALUE_THRESHOLD = 80;

export async function initializeLeadScoringTable(): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS lead_scores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL UNIQUE,
        total_score INT DEFAULT 0,
        assessment_completions INT DEFAULT 0,
        whitepaper_downloads INT DEFAULT 0,
        persona_selections INT DEFAULT 0,
        resource_downloads INT DEFAULT 0,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        high_value_notified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_email (user_email),
        INDEX idx_total_score (total_score),
        INDEX idx_last_activity (last_activity)
      )
    `);
  } catch (error) {
    console.error('Lead scoring table initialization error:', error);
  }
}

export async function updateLeadScore(
  userEmail: string,
  eventType: 'assessment_completion' | 'whitepaper_download' | 'persona_selection' | 'resource_download'
): Promise<LeadScore | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    // Initialize table if it doesn't exist
    await initializeLeadScoringTable();

    // Get current lead score
    const existingLeadResult: any = await db.execute(sql`
      SELECT * FROM lead_scores WHERE user_email = ${userEmail}
    `);

    const existingLead = existingLeadResult[0]?.[0];

    // Calculate score increment
    let scoreIncrement = 0;
    let activityField = '';

    switch (eventType) {
      case 'assessment_completion':
        scoreIncrement = SCORING_WEIGHTS.ASSESSMENT_COMPLETION;
        activityField = 'assessment_completions';
        break;
      case 'whitepaper_download':
        scoreIncrement = SCORING_WEIGHTS.WHITEPAPER_DOWNLOAD;
        activityField = 'whitepaper_downloads';
        break;
      case 'persona_selection':
        scoreIncrement = SCORING_WEIGHTS.PERSONA_SELECTION;
        activityField = 'persona_selections';
        break;
      case 'resource_download':
        scoreIncrement = SCORING_WEIGHTS.RESOURCE_DOWNLOAD;
        activityField = 'resource_downloads';
        break;
    }

    if (existingLead) {
      // Update existing lead
      const newScore = existingLead.total_score + scoreIncrement;
      const newActivityCount = (existingLead[activityField] || 0) + 1;

      await db.execute(sql`
        UPDATE lead_scores
        SET 
          total_score = ${newScore},
          ${sql.raw(activityField)} = ${newActivityCount},
          last_activity = CURRENT_TIMESTAMP
        WHERE user_email = ${userEmail}
      `);

      // Check if lead crossed high-value threshold
      if (newScore >= HIGH_VALUE_THRESHOLD && !existingLead.high_value_notified) {
        await notifyHighValueLead(userEmail, newScore);
        await db.execute(sql`
          UPDATE lead_scores
          SET high_value_notified = TRUE
          WHERE user_email = ${userEmail}
        `);
      }

      return {
        userEmail,
        totalScore: newScore,
        lastActivity: new Date(),
        activities: {
          assessmentCompletions: activityField === 'assessment_completions' ? newActivityCount : existingLead.assessment_completions,
          whitepaperDownloads: activityField === 'whitepaper_downloads' ? newActivityCount : existingLead.whitepaper_downloads,
          personaSelections: activityField === 'persona_selections' ? newActivityCount : existingLead.persona_selections,
          resourceDownloads: activityField === 'resource_downloads' ? newActivityCount : existingLead.resource_downloads,
        },
      };
    } else {
      // Create new lead
      await db.execute(sql`
        INSERT INTO lead_scores (
          user_email,
          total_score,
          ${sql.raw(activityField)}
        ) VALUES (
          ${userEmail},
          ${scoreIncrement},
          1
        )
      `);

      return {
        userEmail,
        totalScore: scoreIncrement,
        lastActivity: new Date(),
        activities: {
          assessmentCompletions: eventType === 'assessment_completion' ? 1 : 0,
          whitepaperDownloads: eventType === 'whitepaper_download' ? 1 : 0,
          personaSelections: eventType === 'persona_selection' ? 1 : 0,
          resourceDownloads: eventType === 'resource_download' ? 1 : 0,
        },
      };
    }
  } catch (error) {
    console.error('Lead score update error:', error);
    return null;
  }
}

async function notifyHighValueLead(userEmail: string, score: number): Promise<void> {
  try {
    await notifyOwner({
      title: '🔥 High-Value Lead Alert',
      content: `A prospect has reached a lead score of ${score} points!\n\nEmail: ${userEmail}\n\nThis lead has shown significant engagement with your security content and may be ready for a sales conversation.\n\nRecommended next steps:\n1. Review their activity in the analytics dashboard\n2. Send a personalized follow-up email\n3. Schedule a consultation call`,
    });
  } catch (error) {
    console.error('High-value lead notification error:', error);
  }
}

export async function getLeadScore(userEmail: string): Promise<LeadScore | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result: any = await db.execute(sql`
      SELECT * FROM lead_scores WHERE user_email = ${userEmail}
    `);

    const lead = result[0]?.[0];
    if (!lead) return null;

    return {
      userEmail: lead.user_email,
      totalScore: lead.total_score,
      lastActivity: new Date(lead.last_activity),
      activities: {
        assessmentCompletions: lead.assessment_completions,
        whitepaperDownloads: lead.whitepaper_downloads,
        personaSelections: lead.persona_selections,
        resourceDownloads: lead.resource_downloads,
      },
    };
  } catch (error) {
    console.error('Lead score retrieval error:', error);
    return null;
  }
}

export async function getTopLeads(limit: number = 10): Promise<LeadScore[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const result: any = await db.execute(sql`
      SELECT * FROM lead_scores
      ORDER BY total_score DESC, last_activity DESC
      LIMIT ${limit}
    `);

    const leads = result[0] || [];
    return leads.map((lead: any) => ({
      userEmail: lead.user_email,
      totalScore: lead.total_score,
      lastActivity: new Date(lead.last_activity),
      activities: {
        assessmentCompletions: lead.assessment_completions,
        whitepaperDownloads: lead.whitepaper_downloads,
        personaSelections: lead.persona_selections,
        resourceDownloads: lead.resource_downloads,
      },
    }));
  } catch (error) {
    console.error('Top leads retrieval error:', error);
    return [];
  }
}
