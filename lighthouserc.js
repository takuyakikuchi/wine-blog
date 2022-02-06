module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      staticDistDir: '.next/server/pages',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
