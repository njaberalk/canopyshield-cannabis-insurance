'use client';
import { useEffect, useRef } from 'react';

const ANIM_CLASSES = '.fade-in-view, .fade-in-view-left, .fade-in-view-right, .stagger-children';

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        },
        { threshold: 0.01, rootMargin: '200px 0px 0px 0px' }
      );
      observer.observe(el);
      ref._cleanup = () => observer.disconnect();
    }, 50);

    return () => {
      clearTimeout(timer);
      if (ref._cleanup) ref._cleanup();
    };
  }, [threshold]);

  return ref;
}

export function useScrollAnimations() {
  useEffect(() => {
    const observed = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
            observed.delete(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '200px 0px 0px 0px' }
    );

    // Observe existing elements
    function observeAll() {
      document.querySelectorAll(ANIM_CLASSES).forEach((el) => {
        if (!observed.has(el) && !el.classList.contains('is-visible')) {
          observer.observe(el);
          observed.add(el);
        }
      });
    }

    // Initial pass
    const timer = setTimeout(observeAll, 100);

    // Watch for new elements added to DOM (React hydration, lazy components)
    const mutation = new MutationObserver(() => {
      observeAll();
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    // Also re-check on scroll in case observer missed anything
    let scrollTimer;
    const onScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(observeAll, 200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimer);
      observer.disconnect();
      mutation.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}

export function useNavScrollBehavior() {
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY.current;
        const pastThreshold = currentScrollY > 100;

        if (pastThreshold && isScrollingDown) {
          nav.style.transform = 'translateY(-100%)';
        } else {
          nav.style.transform = 'translateY(0)';
        }

        lastScrollY.current = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return navRef;
}
