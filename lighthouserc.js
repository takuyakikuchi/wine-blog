module.exports = {
  ci: {
    collect: {
      staticDistDir: '.next/server/pages/blog',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
