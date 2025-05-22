/**
 * Typography system with REM units for accessibility.
 * Includes responsive line heights.
 */
export const Typography = {
    fontFamily: {
        base: '"Poppins", system-ui, sans-serif',
        heading: '"Poppins", "Helvetica Neue", sans-serif',
    },
    fontSize: {
        body: '1rem',      // 16px
        small: '0.875rem', // 14px
        h1: '2.5rem',      // 40px
        h2: '2rem',        // 32px
        h3: '1.5rem',      // 24px
        button: '1rem',
    },
    fontWeight: {
        regular: 400,
        medium: 500,
        bold: 700,
    },
    lineHeight: {
        body: 1.6,       // For readability
        heading: 1.2,    // Tighter for headings
        button: 1.5,
    },
  };