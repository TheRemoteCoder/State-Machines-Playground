module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['import', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'class-methods-use-this': false,
  },
};
