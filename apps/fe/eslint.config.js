import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
// eslint-disable-next-line import/order
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import baseConfig from '../../eslint.config.mjs';

export default defineConfig([
  ...baseConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-undef': 'off',
      'no-redeclare': 'off',
    },
  },
]);
