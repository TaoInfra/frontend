module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended"
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parser": "@typescript-eslint/parser", 
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint" 
	],
	"rules": {
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-unused-vars":"warn",
		"react/prop-types": "off",
		"indent": ["error", "tab"]
	},
	"ignorePatterns": [
		"components/ui/**",
		".eslintrc.js",
		"next.config.js",
		"postcss.config.js",
		"**/*.mdx",
		"mdx-components.tsx"
	  ],
}  

