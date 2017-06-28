/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global Components, Services, XPCOMUtils */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "AboutPioneerProtocol" }] */

"use strict";

const {utils: Cu, interfaces: Ci, manager: Cm, results: Cr} = Components;
Cm.QueryInterface(Ci.nsIComponentRegistrar);

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

this.EXPORTED_SYMBOLS = ["AboutPioneerProtocol"];

/**
 * Required data for registering a protocol handler. This data is referred to
 * when creating the new channel, as well as actually registering the
 * component factory.
 */
const protocolInfo = {
  // The file/destination for the protocol.
  uri: Services.io.newURI("resource://about-pioneer/lib/AboutStudies.xml"),
  // Other properties are used internally by the protocol handler.
  classDescription: "about:pioneer page module",
  classID: Components.ID("ad24d962-8c77-43d6-b6b3-510200c0f246"),
  contractID: "@mozilla.org/network/protocol/about;1?what=pioneer",
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIPioneerProtocolHandler])
};

/**
 * Component definition for the about:pioneer protocol handler.
 * Registers a component with the browser that establishes an `about:pioneer`
 * protocol handler. Navigating to `about:pioneer` displays `AboutStudies.xml`.
 */
class StudiesProtocolHandler {
  newChannel() {
    let chan;
    try {
      chan = Services.io.newChannelFromURI2(
        protocolInfo.uri,
        null,
        Services.scriptSecurityManager.getSystemPrincipal(),
        null,
        Ci.nsILoadInfo.SEC_ALLOW_CROSS_ORIGIN_DATA_IS_NULL,
        Ci.nsIContentPolicy.TYPE_DOCUMENT
      );
    } catch (ex) {
      throw new Error(`Error creating about:pioneer protocol - ${ex}`);
    }

    return chan;
  }

  // Required by the protocol handler, despite not doing anything.
  getURIFlags() {}
}

/**
 * Protocol-handling manager. Exposes functions to un/register the protocol
 * handler, effectively enabling or disabling the ability for users to navigate
 * to `about:pioneer`.
 */
const AboutPioneerProtocol = {
  instance: null,

  /**
   * Enable the `about:pioneer` protocol handler.
   */
  register() {
    // We only need to register the component once.
    if (this.instance) {
      return;
    }

    // Component factory definition for the protocol handler,
    // required for Cm.registerFactory.
    const protocolFactory = {
      createInstance(outer) {
        if (outer) {
          throw Cr.NS_ERROR_NO_AGGREGATION;
        }
        return new StudiesProtocolHandler();
      }
    };

    const {
      classID,
      classDescription,
      contractID
    } = protocolInfo;

    // Actually register the component (and therefor protocol) with the browser.
    Cm.registerFactory(classID, classDescription, contractID, protocolFactory);

    // Save the registered factory's information, to unregister later.
    this.instance = protocolFactory;
  },

  /**
   * Unregister component, disabling the `about:pioneer` handler.
   */
  unregister() {
    if (this.instance) {
      const {classID} = protocolInfo;
      Cm.unregisterFactory(classID, this.instance);
    }

    this.instance = null;
  }
};
