const path = require("path");
const fs = require("fs");

beforeEach(() => {
  // Naively assume the current working directory is the package we want to
  //    test and use a private method from Atom PackageManager to load it.
  //
  // This is bad and hacky. I'm sorry.
  const testedPackage = atom.packages.loadPackage(
    atom.getLoadSettings().testPaths[0]
  );

  // Correctly add the name of the package.
  // This is an issue with CI if the repo name does not match the repo name.
  atom.packages.loadedPackages[testedPackage.metadata.name] = testedPackage;

  atom.project.setPaths([require("os").tmpdir()]);

  // TODO:
  // Looking to best replicate what's necesarry from the built-in Jasmine specHelper:
  // https://github.com/atom/atom/blob/9654e64c041d42d02b4839d6c9870c173e79ee0a/spec/spec-helper.coffee#L64-L123
  
  // jest.spyOn(atom.menu, "sendToBrowserProcess");
  // 
  // atom.config.set("core.destroyEmptyPanes", false);
  // atom.config.set("editor.fontFamily", "Courier");
  // atom.config.set("editor.fontSize", 16);
  // atom.config.set("editor.autoIndent", false);
  // 
  // const { resourcePath } = atom.getLoadSettings();
  // 
  // const electronPath = path.join(
  //   resourcePath,
  //   "..",
  //   "electron.asar",
  //   "renderer",
  //   "api",
  //   "exports",
  //   "electron.js"
  // );
  // 
  // jest.mock("electron", () => require(electronPath), { virtual: true });
  // 
  // const TextEditor = require(path.join(resourcePath, "src", "text-editor"));
  // const TextEditorElement = require(path.join(resourcePath, "src", "text-editor-element"))
  // // const TokenizedBuffer = require(path.join(resourcePath, "src", "tokenized-buffer"))
  // const clipboard = require(path.join(resourcePath, "src", "safe-clipboard"));
  // 
  // // console.log(TextEditorElement)
  // // console.log(TokenizedBuffer)
  // // console.log(clipboard)
  // 
  // TextEditorElement.prototype.setUpdatedSynchronously(true);
  // 
  // jest
  //   .spyOn(TextEditor.prototype, "shouldPromptToSave")
  //   .mockImplementation(() => false);
  // 
  // let clipboardContent = "initial clipboard content";
  // jest
  //   .spyOn(clipboard, "writeText")
  //   .mockImplementation(text => (clipboardContent = text));
  // jest.spyOn(clipboard, "readText").mockImplementation(() => clipboardContent);
});


// TODO:
// Looking to best replicate what's necesarry from the built-in Jasmine specHelper:
// https://github.com/atom/atom/blob/9654e64c041d42d02b4839d6c9870c173e79ee0a/spec/spec-helper.coffee#L125-L135
afterEach(async () => {
  await atom.reset();
});
