"use strict";

const JsdomEnvironment = require("jest-environment-jsdom");

class AtomEnvironment extends JsdomEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    // Let Jest setup the base Jsdom environment.
    await super.setup();
    
    // Pass down the Atom global configured by the test runner.
    this.global.atom = global.atom;

    // Naively assume the current working directory is the package we want to
    //    test and use a private method from Atom PackageManager to load it.
    //
    // This is bad and hacky. I'm sorry.
    this.testedPackage = this.global.atom.packages.loadPackage(process.cwd());

    // Correctly add the name of the package.
    // This is an issue with CI if the repo name does not match the repo name.
    this.global.atom.packages.loadedPackages[
      this.testedPackage.metadata.name
    ] = this.testedPackage;
  }
}

module.exports = AtomEnvironment;
