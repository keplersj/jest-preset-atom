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

const BABEL_PREFIXES = [
  '/** @babel */',
  '"use babel"',
  '\'use babel\'',
  '/* @flow */'
]

const BABEL_PREFIX_LENGTH = Math.max.apply(Math, BABEL_PREFIXES.map(function (prefix) {
  return prefix.length
}))

function shouldBabelCompile(sourceCode) {
  var start = sourceCode.substr(0, BABEL_PREFIX_LENGTH)
  return BABEL_PREFIXES.some(function (prefix) {
    return start.indexOf(prefix) === 0
  })
}


function processBabel(src, path) {
  if (shouldBabelCompile(src)) {
    return babel.transform(
      src,
      Object.assign({}, defaultBabelConfig, { filename: path })
    ).code;
  }
  
  return src;
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
