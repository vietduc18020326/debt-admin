const fs = require("fs");
const path = require("path");
const packageJson = require("./package.json");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN environment variable is not set.");
}

packageJson["dependencies"]["shared-core"] = packageJson["dependencies"][
  "shared-core"
].replace("<github_token>", GITHUB_TOKEN);

fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));
console.log("Package.json updated with the GitHub token.");
