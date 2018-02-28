"use strict";

const JsdomEnvironment = require("jest-environment-jsdom");

class AtomEnvironment extends JsdomEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    this.global.atom = global.atom;
    
    // Naively assume the current working directory is the package we want to
    //    test and use a private method from Atom PackageManager to load it.
    //
    // This is bad and hacky. I'm sorry.
    this.global.atom.packages.loadPackage(process.cwd());
  }
}

module.exports = AtomEnvironment;
