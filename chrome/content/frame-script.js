console.log("Start loading framescript");
const globalMM = Components.classes["@mozilla.org/globalmessagemanager;1"]
               .getService(Components.interfaces.nsIMessageListenerManager);

globalMM.addMessageListener(
  "AboutPioneerOptions",
  {
    receiveMessage: aMsg => {
      dump(`incoming message from frame script: ${aMsg}`);
      // Now do a second message passing from frame-script to bootstrap.js
      // script which has chrome capability and preference access
    }
  },
  true // must set this argument to true, otherwise sending message from framescript will not work during and after the unload event on the ContentMessageManager triggers
);

console.log("Completed loading framescript");
