import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const tIntro = await getTranslations('Intro');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8">
      <div className="max-w-2xl">
        <h1
          className="text-5xl md:text-6xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {tIntro('name')}
        </h1>
        <p
          className="text-xl mb-1"
          style={{
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {tIntro('role')}
        </p>
        <p
          className="text-sm mb-6"
          style={{
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {tIntro('location')}
        </p>
        <p
          className="text-lg"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {tIntro('tagline')}
        </p>
      </div>
    </main>
  );
}
