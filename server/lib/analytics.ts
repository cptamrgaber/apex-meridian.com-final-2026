import { getDb } from '../db';
import { sql } from 'drizzle-orm';

export interface AnalyticsEvent {
  eventType: 'resource_download' | 'assessment_completion' | 'persona_selection' | 'whitepaper_download';
  resourceType?: string;
  resourceId?: string;
  personaType?: string;
  userEmail?: string;
  metadata?: Record<string, any>;
}

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  try {
    // Create analytics_events table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        resource_type VARCHAR(100),
        resource_id VARCHAR(255),
        persona_type VARCHAR(50),
        user_email VARCHAR(255),
        metadata JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_event_type (event_type),
        INDEX idx_created_at (created_at),
        INDEX idx_user_email (user_email)
      )
    `);

    // Insert analytics event
    await db.execute(sql`
      INSERT INTO analytics_events (
        event_type,
        resource_type,
        resource_id,
        persona_type,
        user_email,
        metadata
      ) VALUES (
        ${event.eventType},
        ${event.resourceType || null},
        ${event.resourceId || null},
        ${event.personaType || null},
        ${event.userEmail || null},
        ${event.metadata ? JSON.stringify(event.metadata) : null}
      )
    `);
  } catch (error) {
    console.error('Analytics tracking error:', error);
    // Don't throw error - analytics should not break the main flow
  }
}

export async function getAnalytics(startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) return { events: [] };
  
  try {
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default: last 30 days
    const end = endDate || new Date();

    // Get all events
    const eventsResult: any = await db.execute(sql`
      SELECT 
        id,
        event_type as eventType,
        resource_type as resourceType,
        resource_id as resourceId,
        persona_type as personaType,
        user_email as userEmail,
        metadata,
        created_at as createdAt
      FROM analytics_events
      WHERE created_at BETWEEN ${start.toISOString()} AND ${end.toISOString()}
      ORDER BY created_at DESC
    `);

    // Get assessment scores from metadata
    const events = eventsResult[0] || [];
    const eventsWithScores = events.map((e: any) => ({
      ...e,
      assessmentScore: e.metadata ? JSON.parse(e.metadata).score : null,
    }));

    return {
      events: eventsWithScores,
    };
  } catch (error) {
    console.error('Analytics retrieval error:', error);
    return { events: [] };
  }
}
