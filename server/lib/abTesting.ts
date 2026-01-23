import { getDb } from "../db";
import { sql } from "drizzle-orm";

/**
 * A/B Testing System for Content Optimization
 * 
 * Allows testing different variants of content (headlines, CTAs, descriptions)
 * and tracking conversion rates to identify winning variants.
 */

export interface ABTest {
  id: number;
  name: string;
  description: string;
  page: string;
  element: string;
  variantA: string;
  variantB: string;
  status: 'draft' | 'running' | 'completed';
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
}

export interface ABTestResult {
  testId: number;
  variant: 'A' | 'B';
  impressions: number;
  conversions: number;
  conversionRate: number;
}

/**
 * Create a new A/B test
 */
export async function createABTest(data: {
  name: string;
  description: string;
  page: string;
  element: string;
  variantA: string;
  variantB: string;
}): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db.execute(sql`
    INSERT INTO ab_tests (name, description, page, element, variant_a, variant_b, status, created_at)
    VALUES (${data.name}, ${data.description}, ${data.page}, ${data.element}, ${data.variantA}, ${data.variantB}, 'draft', NOW())
  `);
  
  return (result as any).insertId;
}

/**
 * Start an A/B test
 */
export async function startABTest(testId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  await db.execute(sql`
    UPDATE ab_tests
    SET status = 'running', start_date = NOW()
    WHERE id = ${testId}
  `);
}

/**
 * Stop an A/B test
 */
export async function stopABTest(testId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  await db.execute(sql`
    UPDATE ab_tests
    SET status = 'completed', end_date = NOW()
    WHERE id = ${testId}
  `);
}

/**
 * Record an impression for a variant
 */
export async function recordImpression(testId: number, variant: 'A' | 'B', userId?: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  await db.execute(sql`
    INSERT INTO ab_test_events (test_id, variant, event_type, user_id, created_at)
    VALUES (${testId}, ${variant}, 'impression', ${userId || null}, NOW())
  `);
}

/**
 * Record a conversion for a variant
 */
export async function recordConversion(testId: number, variant: 'A' | 'B', userId?: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  await db.execute(sql`
    INSERT INTO ab_test_events (test_id, variant, event_type, user_id, created_at)
    VALUES (${testId}, ${variant}, 'conversion', ${userId || null}, NOW())
  `);
}

/**
 * Get results for an A/B test
 */
export async function getABTestResults(testId: number): Promise<ABTestResult[]> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const results = await db.execute(sql`
    SELECT 
      variant,
      SUM(CASE WHEN event_type = 'impression' THEN 1 ELSE 0 END) as impressions,
      SUM(CASE WHEN event_type = 'conversion' THEN 1 ELSE 0 END) as conversions
    FROM ab_test_events
    WHERE test_id = ${testId}
    GROUP BY variant
  `);
  
  return (results as any[]).map((row: any) => ({
    testId,
    variant: row.variant,
    impressions: Number(row.impressions),
    conversions: Number(row.conversions),
    conversionRate: row.impressions > 0 ? (Number(row.conversions) / Number(row.impressions)) * 100 : 0
  }));
}

/**
 * Get all A/B tests
 */
export async function getAllABTests(): Promise<ABTest[]> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const results = await db.execute(sql`
    SELECT id, name, description, page, element, variant_a, variant_b, status, start_date, end_date, created_at
    FROM ab_tests
    ORDER BY created_at DESC
  `);
  
  return (results as any[]).map((row: any) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    page: row.page,
    element: row.element,
    variantA: row.variant_a,
    variantB: row.variant_b,
    status: row.status,
    startDate: row.start_date,
    endDate: row.end_date,
    createdAt: row.created_at
  }));
}

/**
 * Get variant for a user (consistent assignment)
 */
export async function getVariantForUser(testId: number, userId: string): Promise<'A' | 'B'> {
  // Use simple hash to consistently assign users to variants
  const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % 2 === 0 ? 'A' : 'B';
}
