/**
 * Resolve the active theme id for the current request.
 *
 * Reads the `x-theme-id` header set by middleware.ts (which extracts it from
 * the `?theme=X` search param). Falling back to `'default'` covers requests
 * that bypass middleware (e.g., API routes excluded from the matcher).
 *
 * Shared between the layout, i18n/request.ts, and any future server-side
 * consumers so the header name + default id live in exactly one place.
 * Server-only — wraps `headers()` which does not exist on the client.
 */

import 'server-only';
import { headers } from 'next/headers';

export async function resolveThemeId(): Promise<string> {
  const headerList = await headers();
  return headerList.get('x-theme-id') ?? 'default';
}
