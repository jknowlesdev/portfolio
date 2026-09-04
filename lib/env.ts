/**
 * Runtime environment helpers. Prefer these over inline
 * `process.env.NODE_ENV !== 'production'` checks so call sites stay readable
 * and the env source lives in one place.
 *
 * Works in both server and client code — Next inlines `process.env.NODE_ENV`
 * at build time, so no `'server-only'` marker needed.
 */

export const isDev = process.env.NODE_ENV !== 'production';
