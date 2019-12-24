module.exports = {
    env: {
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    rules: {
        'no-await-in-loop': 'error',
        'no-template-curly-in-string': 'error',

        'no-else-return': 'error',
        'no-new-wrappers': 'error',
        'no-useless-catch': 'error',
        'require-await': 'error',

        'no-dupe-class-members': 'off',
        'no-console': 'off',

        'array-bracket-newline': ['error', 'consistent'],
        'block-spacing': ['error', 'never'],
        'func-call-spacing': 'error',
        'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
        'max-len': ['error', {code: 120, ignoreUrls: true}],
        'multiline-ternary': ['error', 'always-multiline'],
        'no-lonely-if': 'error',
        'no-multi-assign': 'error',
        'no-unneeded-ternary': 'error',
        'object-shorthand': ['error', 'properties'],
        'prefer-object-spread': 'error',

        'no-duplicate-imports': 'error',

        '@typescript-eslint/ban-ts-ignore': 'error',
        '@typescript-eslint/member-delimiter-style': ['error', {
            singleline: {
                delimiter: 'comma',
                requireLast: false
            }
        }],
        '@typescript-eslint/member-ordering': ['error', {
            default: [
                'static-field',
                'public-instance-field',
                'private-instance-field',
                'instance-field',
                'constructor',
                'public-instance-method'
            ]
        }],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-inferrable-types': ['error', {
            ignoreParameters: false,
            ignoreProperties: false
        }],
        '@typescript-eslint/no-object-literal-type-assertion': ['error', {allowAsParameter: true}],
        '@typescript-eslint/no-triple-slash-reference': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-use-before-define': ['error', {functions: false}],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',

        'capitalized-comments': 'off',
        'no-dupe-class-members': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',

        '@typescript-eslint/indent': ['off', 4, {SwitchCase: 1}],
        indent: ['error', 4, {SwitchCase: 1}],
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-unnecessary-qualifier': 'off',
        'interface-name': [true, 'always-prefix'],
        '@typescript-eslint/interface-name-prefix': ['error', 'always'],
        '@typescript-eslint/no-parameter-properties': 'off'
    }
};
