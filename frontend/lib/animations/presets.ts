// Animation configuration constants used with GSAP + ScrollTrigger

export const EASE = {
  smooth: 'power2.out',
  snappy: 'power3.out',
  elastic: 'elastic.out(1, 0.5)',
  slow: 'power1.inOut',
} as const

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.2,
  verySlow: 1.8,
} as const

export const STAGGER = {
  tight: 0.05,
  base: 0.1,
  loose: 0.2,
} as const

// Scroll trigger default config
export const scrollTriggerDefaults = {
  start: 'top 85%',
  end: 'bottom 15%',
  toggleActions: 'play none none none',
} as const

// Fade up — most common reveal
export const fadeUpConfig = {
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0, duration: DURATION.base, ease: EASE.smooth },
} as const

// Fade in — for images and backgrounds
export const fadeInConfig = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: DURATION.slow, ease: EASE.slow },
} as const

// Clip reveal — for text lines
export const clipRevealConfig = {
  from: { clipPath: 'inset(0 100% 0 0)' },
  to: { clipPath: 'inset(0 0% 0 0)', duration: DURATION.slow, ease: EASE.snappy },
} as const

// Scale in — for cards
export const scaleInConfig = {
  from: { opacity: 0, scale: 0.95 },
  to: { opacity: 1, scale: 1, duration: DURATION.base, ease: EASE.smooth },
} as const
