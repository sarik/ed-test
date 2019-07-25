import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp, isAuthenticated } from './helper'

let authToken;

async function init() {
    // SystemJS.import('/auth.js').then(auth => auth.toggleAuth().then(res => {authToken=res}))
    const authenticationStatus = await isAuthenticated();
    if(authenticationStatus) {
        const globalEventDistributor = new GlobalEventDistributor();
        const loadingPromises = [];

        // Attendance-app: The URL "/check-in/..." is being redirected to "http://localhost:9001/..." this is done by the webpack proxy (webpack.config.js)
        loadingPromises.push(loadApp('attendance', '/check-in', '/attendance/singleSpaEntry.js', null, globalEventDistributor, {'test': 'test'}));


        // Account-app: The URL "/account/..." is being redirected to "http://localhost:9005/..." this is done by the webpack proxy (webpack.config.js)
        loadingPromises.push(loadApp('account', '/account', '/account/singleSpaEntry.js', null, globalEventDistributor, null));


        // wait until all stores are loaded and all apps are registered with singleSpa
        await Promise.all(loadingPromises);

        singleSpa.start();
    } else {
        console.log('not authenticated');
    }
}

init();

