import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        languageOptions: { globals: globals.node },
        env: {
            // ... other environments like node, browser, etc.
            'jest/globals': true, // Add this line to include Jest globals
        },
        plugins: [
            // ... other plugins
            'jest', // Add this line to include eslint-plugin-jest
        ],
        extends: [
            // ... other extends
            'plugin:jest/recommended', // Add this line to include recommended Jest rules
        ],
        // ... other configurations
    },
    pluginJs.configs.recommended,
];
