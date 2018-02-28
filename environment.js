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
    this.testedPackage = this.global.atom.packages.loadPackage(process.cwd());
    
    if (this.testedPackage !== null) {
      this.testedPackage.enable()
    } else {
      throw new Error(`Could not load package at ${process.cwd()}!`)
    }
  }
}

module.exports = AtomEnvironment;
