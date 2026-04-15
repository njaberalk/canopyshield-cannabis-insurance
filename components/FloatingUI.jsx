'use client';
import StickyCTA from './StickyCTA';
import BackToTop from './BackToTop';
import CookieConsent from './CookieConsent';

export default function FloatingUI() {
  return (
    <>
      <StickyCTA />
      <BackToTop />
      <CookieConsent />
    </>
  );
}
