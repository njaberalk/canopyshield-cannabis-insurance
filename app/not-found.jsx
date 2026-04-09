import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone flex items-center justify-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="text-center px-6">
        <p className="text-gold font-bold uppercase tracking-[0.15em] mb-4" style={{ fontSize: '0.85rem' }}>
          Page Not Found
        </p>
        <h1 className="text-brand font-extrabold mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '1' }}>
          404
        </h1>
        <p className="text-brand/70 mb-8 max-w-md mx-auto" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find the right coverage.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center border-2 border-gold bg-gold text-brand text-center uppercase tracking-[0.16em] rounded-[2rem] font-semibold hover:border-brand hover:bg-brand hover:text-stone no-underline"
            style={{ padding: '0.8rem 2rem 0.7rem', fontSize: '0.75rem', lineHeight: '2', transition: 'all 0.24s' }}
          >
            Back to Home
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center justify-center border-2 border-brand text-brand bg-transparent text-center uppercase tracking-[0.16em] rounded-[2rem] font-semibold hover:bg-brand hover:text-stone no-underline"
            style={{ padding: '0.8rem 2rem 0.7rem', fontSize: '0.75rem', lineHeight: '2', transition: 'all 0.24s' }}
          >
            Get a Quote
          </a>
        </div>
      </div>
    </div>
  );
}
