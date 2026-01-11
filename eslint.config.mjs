import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      curly: 'warn',
      eqeqeq: 'warn',
      'no-throw-literal': 'warn',
      'no-async-promise-executor': 'error',
    },
  },
  {
    ignores: ['out/**', 'node_modules/**'],
  }
);
