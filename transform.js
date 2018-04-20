const path = require("path");
const { resourcePath, atomHome } = atom.getLoadSettings();
const CompileCache = require(path.join(resourcePath, "src", "compile-cache"));
CompileCache.setAtomHomeDirectory(atomHome)

module.exports = {
  process: (src, path) => CompileCache.addPathToCache(path, atomHome)
};
