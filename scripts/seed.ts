/**
 * Seed script — syncs themes/*.json (partial overrides) → Postgres themes table.
 *
 * Defaults live in code (globals.css + lib/theme/default-*.ts), so theme JSON
 * files contain only the fields that differ from those defaults. The DB row
 * for a theme IS the diff-from-defaults. Merging with defaults happens at
 * request time in i18n/request.ts and the ThemeProvider.
 *
 * Run via `pnpm db:seed`.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { db } from '@/lib/db';
import { themes } from '@/db/schema';
import { themeOverrideSchema } from '@/lib/theme/theme.zod';

const themesDir = join(process.cwd(), 'themes');

async function main() {
  console.log(`Seeding themes from ${themesDir}`);

  const files = await readdir(themesDir);
  const themeFiles = files.filter(
    (f) => f.startsWith('theme-') && f.endsWith('.json'),
  );

  if (themeFiles.length === 0) {
    console.warn('No theme-*.json files found. Nothing to seed.');
    return;
  }

  for (const file of themeFiles) {
    const rawJson = await readFile(join(themesDir, file), 'utf-8');
    const parsed = JSON.parse(rawJson);

    // Validate as a partial override (id + displayName required, rest optional).
    const override = themeOverrideSchema.parse(parsed);

    await db
      .insert(themes)
      .values({
        id: override.id,
        displayName: override.displayName,
        description: override.description,
        styles: override.styles ?? {},
        translations: override.translations ?? {},
        flags: override.flags ?? {},
      })
      .onConflictDoUpdate({
        target: themes.id,
        set: {
          displayName: override.displayName,
          description: override.description,
          styles: override.styles ?? {},
          translations: override.translations ?? {},
          flags: override.flags ?? {},
          updatedAt: new Date(),
        },
      });

    console.log(`  ✓ ${file} → theme "${override.id}"`);
  }

  console.log(`Seeded ${themeFiles.length} theme(s).`);
}

main().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
