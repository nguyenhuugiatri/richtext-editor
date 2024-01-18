module.exports = {
  // Configuration for JavaScript files
  extends: [
    'airbnb-base',
    'next/core-web-vitals', // Needed to avoid warning in next.js build: 'The Next.js plugin was not detected in your ESLint configuration'
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-plusplus': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
        semi: false,
      },
    ], // Avoid conflict rule between Prettier and Airbnb Eslint
  },
  overrides: [
    // Configuration for TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: [
        '@typescript-eslint',
        'unused-imports',
        'tailwindcss',
        'simple-import-sort',
      ],
      extends: [
        'plugin:tailwindcss/recommended',
        'airbnb',
        'airbnb-typescript',
        'next/core-web-vitals',
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
            semi: false,
          },
        ], // Avoid conflict rule between Prettier and Airbnb Eslint
        'import/extensions': 'off', // Avoid missing file extension errors, TypeScript already provides a similar feature
        'react/function-component-definition': 'off', // Disable Airbnb's specific function type
        'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
        'react/require-default-props': 'off', // Allow non-defined react props as undefined
        'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
        '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
        '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
        'no-restricted-syntax': [
          'error',
          'ForInStatement',
          'LabeledStatement',
          'WithStatement',
        ], // Overrides Airbnb configuration and enable no-restricted-syntax
        'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
        'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
        'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
        'import/order': 'off', // Avoid conflict rule between `eslint-plugin-import` and `eslint-plugin-simple-import-sort`
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@next/next/no-img-element': 'off',
        'no-empty': 'off',
        'default-case': 'warn',
        'consistent-return': 'warn',
        'import/no-extraneous-dependencies': 'warn',
        'no-param-reassign': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'no-underscore-dangle': 'off',
        'jsx-a11y/alt-text': 'off',
        '@typescript-eslint/no-shadow': 'off',
        'tailwindcss/no-custom-classname': [
          'warn',
          {
            whitelist: [
              // Matcha
              '(matcha\\-).*',
            ],
          },
        ],
      },
    },
  ],
}
