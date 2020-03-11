import * as singleSpa from "single-spa";
import { GlobalEventDistributor } from "./globalEventDistributor";
import { loadApp } from "./helper";
import getCookie from "./cookies.js";

async function isAuthenticated() {
  const token = await getCookie("token");
  // alert(token)
  if (token) {
    return true;
  }

  return false;
}

async function init() {
  const authenticationStatus = await isAuthenticated();
  if (authenticationStatus) {
    const globalEventDistributor = new GlobalEventDistributor();
    const loadingPromises = [];

    // Attendance-app: The URL "/check-in/..." is being redirected to "http://localhost:9001/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(
      loadApp(
        "attendance",
        "/check-in",
        "/attendance/singleSpaEntry.js",
        null,
        globalEventDistributor,
        { test: "test" }
      )
    );

    // Account-app: The URL "/account/..." is being redirected to "http://localhost:9005/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(
      loadApp(
        "account",
        "/account",
        "/account/singleSpaEntry.js",
        null,
        globalEventDistributor,
        null
      )
    );

    loadingPromises.push(
      loadApp(
        "home",
        "/home",
        "/home/singleSpaEntry.js",
        null,
        globalEventDistributor,
        null
      )
    );
    loadingPromises.push(
      loadApp(
        "discover",
        "/discover",
        "/discover/singleSpaEntry.js",
        null,
        globalEventDistributor,
        null
      )
    );
    loadingPromises.push(
      loadApp(
        "video",
        "/video",
        "/video/singleSpaEntry.js",
        null,
        globalEventDistributor,
        null
      )
    );
    loadingPromises.push(
      loadApp(
        "reset-password",
        "/reset-password",
        "/reset-password/singleSpaEntry.js",
        null,
        globalEventDistributor,
        null
      )
    );

    // wait until all stores are loaded and all apps are registered with singleSpa
    await Promise.all(loadingPromises);

    singleSpa.start();
  } else {
    console.log("not authenticated");
  }
}

init();
