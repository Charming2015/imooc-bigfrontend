module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'error',
      {
        // 句末分号
        semi: true,
        trailingComma: 'es5',
        // 单引号
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        // 函数只有一个参数时去掉括号
        arrowParens: 'avoid',
      },
    ],
  },
};
