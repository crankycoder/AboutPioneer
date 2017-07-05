window.addEventListener('message', function(event) {
  window.alert(event.data);  // Message from content script
}, false);

