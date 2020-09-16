import rainbowSDK from 'rainbow-web-sdk';

/* ALLOW MANIPULATING SDK FROM THE BROWSER CONSOLE */
window.r = rainbowSDK;

/* GLOBAL CONFIG OBJECT */
const config = {
    appId: 'APPID',
    appSecret: 'APPSECRET',
    login: 'USERLOGIN',
    password: 'USERPASSWORD',
};

/* LOAD THE SDK */

let onLoaded = function onLoaded() {
    console.log('[DEMO] :: On SDK Loaded !');

    rainbowSDK
        .initialize(config.appId, config.appSecret)
        .then(() => {
            console.log('[DEMO] :: Rainbow SDK is initialized!');
            rainbowSDK.connection
                .signin(config.login, config.password)
                .then(account => {
                    console.log('User Connected >', account.userData.displayName);
                })
                .catch(err => console.log('ERROR', err));
        })
        .catch(err => {
            console.log('[DEMO] :: Something went wrong with the SDK.', err);
        });
};

/* EVENT LISTENERS */
document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);
document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded);

let onReady = function onReady() {
    console.log('[DEMO] :: On SDK Ready !');
};

rainbowSDK.load();
