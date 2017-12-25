const babel = require("babel-core");
const CoffeeScript = require("coffee-script");
const TypeScriptSimple = require("typescript-simple").TypeScriptSimple;

function processCoffeeScript(src, path) {
  return CoffeeScript.compile(src, {
    filename: path,
    sourceFiles: [path],
    inlineMap: true
  });
}

const defaultBabelConfig = {
  breakConfig: true,
  sourceMap: "inline",
  blacklist: ["es6.forOf", "useStrict"],
  optional: ["asyncToGenerator"],
  stage: 0
};

function processBabel(src, path) {
  return babel.transform(
    src,
    Object.assign({}, defaultBabelConfig, { filename: path })
  ).code;
}

const defaultTypeScriptConfig = {
  target: 1,
  module: "commonjs",
  sourceMap: true
};

function processTypeScript(src, path) {
  return new TypeScriptSimple(
    Object.assign({}, defaultTypeScriptConfig, { filename: path }),
    false
  ).compile(src, path);
}

module.exports = {
  process: (src, path) => {
    if (
      path.endsWith(".coffee") ||
      path.endsWith(".litcoffee") ||
      path.endsWith(".coffee.md")
    ) {
      return processCoffeeScript(src, path);
    } else if (path.endsWith(".js")) {
      return processBabel(src, path);
    } else if (path.endsWith(".ts")) {
      return processTypeScript(src, path);
    } else {
      return src;
    }
  }
};
