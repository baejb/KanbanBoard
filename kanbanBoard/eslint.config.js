import js from '@eslint/js';
import react from 'eslint-plugin-react';
import ts from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,
  react.configs.recommended,
  ts.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17 이상에서 불필요
      'prettier/prettier': 'error', // Prettier 규칙 적용
      '@typescript-eslint/no-unused-vars': ['error'], // 사용하지 않는 변수 경고
    },
    settings: {
      react: {
        version: 'detect', // React 버전 자동 감지
      },
    },
  },
];
