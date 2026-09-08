import { Loader } from '@/lib/components/Loader';

/**
 * Route-level loading UI. Rendered by Next.js as a Suspense fallback while
 * a route's server component is streaming. Reuses the shared Loader.
 */
export default function Loading() {
  return <Loader active={true} />;
}
