https://prabinpoudel.com.np/articles/run-eslint-on-git-commit-with-husky-and-lint-staged/#what-is-husky


+ in package.json
"lint": "eslint ./ --fix"


Workflow:
1. npm install husky
2. npm install eslint
3. Go to the package.json -> "lint": "eslint ./ --fix"
4. .eslintrc.json -> settings should be provied in rules parameter
5. npm set-script prepare "husky install"
6. npm run prepare
7. npx husky add .husky/pre-commit "npm run lint"
8. and finally git add . -> git commit -m ',,..'
9. observe that by commit the linter is working