/**
 * Breakpoints for responsive design (in pixels).
 * Usage example: `@media (min-width: ${Breakpoints.tablet}px)`
 */
export const Breakpoints = {
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    hd: 1440,
};

// Helper for media queries (optional)
export const media = {
    mobile: `(max-width: ${Breakpoints.mobile}px)`,
    tablet: `(min-width: ${Breakpoints.tablet}px)`,
  };