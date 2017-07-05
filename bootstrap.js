"use strict";

/* global Components, XPCOMUtils, AboutPioneerProtocol, Services */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "install|startup|shutdown" }] */

const {utils: Cu} = Components;
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/Services.jsm");

XPCOMUtils.defineLazyModuleGetter(this, "AboutPioneerProtocol",
  "resource://about-pioneer/lib/AboutPioneerProtocol.jsm");

this.install = function() {};

this.startup = function() {
  // Register a listener
  //
  //

  Services.mm.loadFrameScript("chrome://about-pioneer/content/frame-script.js", true);

  // Enable the about:pioneer page
  console.log("Pre register");
  try {
    AboutPioneerProtocol.register();
  } catch (ex) {
    console.log(`Caught ${ex}`);
  }
  console.log("Post register");
};

this.shutdown = function() {
  // Unload add-on modules.
  const modules = [
    "lib/AboutPioneerProtocol.jsm"
  ];
  for (const module of modules) {
    console.log.debug(`Unloading ${module}`);
    Cu.unload(`resource://about-pioneer/${module}`);
  }
};

this.uninstall = function() {};
