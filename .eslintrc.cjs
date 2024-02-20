/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
    extends: [
        // Chúng ta sẽ dùng các rule mặc định từ các plugin mà chúng ta đã cài.
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/recommended',
        // Disable các rule mà eslint xung đột với prettier.
        // Để cái này ở dưới để nó override các rule phía trên!.
        'eslint-config-prettier',
        'prettier'
    ],
    plugins: ['prettier'],
    settings: {
        react: {
            // Nói eslint-plugin-react tự động biết version của React.
            version: 'detect'
        },
        // Nói ESLint cách xử lý các import
        'import/resolver': {
            node: {
                paths: [path.resolve(__dirname, '')],
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    env: {
        node: true
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-target-blank': 'warn',
        'prettier/prettier': [
            'warn',
            {
                arrowParens: 'always',
                semi: false,
                trailingComma: 'none',
                tabWidth: 4,
                endOfLine: 'auto',
                useTabs: false,
                singleQuote: true,
                printWidth: 120,
                jsxSingleQuote: true
            }
        ]
    }
}
