/**
 * Seed script — demonstrates the end-to-end DB interaction (schema → push →
 * seed → query) with a single idempotent upsert against the demo_table
 * scaffold.
 *
 * `onConflictDoUpdate` makes re-running safe: first run inserts, subsequent
 * runs update the same row. Adapt when a DB-backed feature (e.g., dev log
 * entries, admin fixtures) needs real seeding. Run via `pnpm db:seed`.
 */

import { db } from '@/db';
import { demoTable } from '@/db/schema';

const demoLabel = 'Placeholder row for db demonstration purposes.';

async function main() {
  const result = await db
    .insert(demoTable)
    .values({ id: 1, label: demoLabel })
    .onConflictDoUpdate({
      target: demoTable.id,
      set: { label: demoLabel },
    })
    .returning();

  console.log(`Seed completed: ${JSON.stringify(result)}`);
}

main().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
