module.exports = function(w) {
  return {
    autoDetect: true,

    files: ['packages/**/*.ts', { pattern: 'packages/**/*spec.ts', ignore: true }],

    tests: ['packages/**/*spec.ts']
  };
};
