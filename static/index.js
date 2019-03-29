if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("serviceworker.js").then(
      registration => {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
        return registration.update();
      },
      err => {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

window.addEventListener("load", function() {
  var status = document.getElementById("status");
  console.log(navigator.onLine);
  function updateOnlineStatus(event) {
    var condition = navigator.onLine ? "online" : "offline";
    console.log(condition);
    status.className = condition;
    status.innerHTML = condition.toUpperCase();
    log.insertAdjacentHTML("beforeend", "Event: " + event.type);
  }
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
});
