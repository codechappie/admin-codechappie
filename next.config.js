const removeImports = require("next-remove-imports")();

module.exports = removeImports({
  reactStrictMode: true,
  images: {
    domains: ["icons8.com", "localhost", "res.cloudinary.com"],
  },
});