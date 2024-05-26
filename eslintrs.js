// .eslintrc.js
module.exports = {
    env: {
        browser: true,
        node: true,
        jest: true, // Include Jest environment
    },
    plugins: ['jest'], // Include eslint-plugin-jest
    extends: ['plugin:jest/recommended'], // Include recommended Jest rules
    // ... other configurations
};
