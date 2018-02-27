"use strict";

const JsdomEnvironment = require("jest-environment-jsdom");

class AtomEnvironment extends JsdomEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    this.global.atom = global.atom;
  }
}

module.exports = AtomEnvironment;
