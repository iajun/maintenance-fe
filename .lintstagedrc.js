export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write', 'git add'],
  '*.{json}': ['prettier --write', 'git add'],
}
