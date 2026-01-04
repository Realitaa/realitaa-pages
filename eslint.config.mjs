// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
// prettier
import prettier from "eslint-config-prettier";

export default withNuxt(
  // Your custom configs here
  {
    extends: [prettier],
  }
)
