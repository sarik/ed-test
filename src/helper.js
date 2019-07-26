import * as singleSpa from 'single-spa';

export function hashPrefix(prefix) {
    return function (location) {
        return location.hash.startsWith(`#${prefix}`);
    }
}

export async function loadApp(name, hash, appURL, storeURL, globalEventDistributor, additionalProps) {
    let storeModule = {}, customProps = {globalEventDistributor: globalEventDistributor};

    // try to import the store module
    try {
        storeModule = storeURL ? await SystemJS.import(storeURL) : {storeInstance: null};
    } catch (e) {
        console.log(`Could not load store of app ${name}.`, e);
    }

    if (storeModule.storeInstance && globalEventDistributor) {
        // add a reference of the store to the customProps
        customProps.store = storeModule.storeInstance;

        // register the store with the globalEventDistributor
        globalEventDistributor.registerStore(storeModule.storeInstance);
    }

    if(additionalProps){
        customProps = {...customProps, ...additionalProps}
    }

    // register the app with singleSPA and pass a reference to the store of the app as well as a reference to the globalEventDistributor
    singleSpa.registerApplication(name, () => SystemJS.import(appURL), hashPrefix(hash), customProps);
}

export async function isAuthenticated(){
    //uncomment to import auth.js using SystemJS. Then use authToken to decide if user is logged in or not

    // const x = await SystemJS.import('/auth.js').then(auth => auth.getAuthToken())
    // console.log(x)
    
    const token = await localStorage.getItem('echoAuth');

    if(token) {
        return true;
    };

    return false;
};

export function authenticate(){

};

export function logout(){

}