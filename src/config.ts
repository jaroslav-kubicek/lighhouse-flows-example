export const mainURL = 'https://www.wiggle.co.uk/';
export const categoryURL = 'https://www.wiggle.co.uk/cycle/jerseys?sr=jersey';

// https://github.com/GoogleChrome/lighthouse/blob/master/docs/recipes/custom-audit/custom-config.js
// https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/default-config.js
export const settings = {
  extends: 'lighthouse:default',
  categories: {
    excellence: {
      title: 'Dev Excellence',
      description: 'Priorities to improve.',
      auditRefs: [
        {
          id: 'largest-contentful-paint',
          weight: 20,
          group: 'metrics',
          acronym: 'LCP',
        },
        {
          id: 'total-blocking-time',
          weight: 25,
          group: 'metrics',
          acronym: 'TBT',
        },
        { id: 'total-byte-weight', weight: 25 },
        { id: 'dom-size', weight: 20 },
        { id: 'errors-in-console', weight: 5 },
        { id: 'valid-source-maps', weight: 5, group: 'best-practices-general' },
        { id: 'resource-summary', weight: 0 },
        { id: 'long-tasks', weight: 0 },
        { id: 'mainthread-work-breakdown', weight: 0 },
      ],
    },
    images: {
      title: 'Efficient images',
      description: 'Lower footprint of thumbnail product images.',
      auditRefs: [
        { id: 'offscreen-images', weight: 30 },
        { id: 'uses-optimized-images', weight: 30 },
        { id: 'modern-image-formats', weight: 10 },
        { id: 'unsized-images', weight: 10 },
        { id: 'uses-responsive-images', weight: 10 },
      ],
    },
  },
};
