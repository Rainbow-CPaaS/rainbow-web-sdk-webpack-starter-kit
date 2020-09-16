import rainbowSDK from 'rainbow-web-sdk';
console.log('SDK TEST PROJECT');
let bubble;

var onReady = function onReady() {
    console.log('[DEMO] :: On SDK Ready !');
};

let onCallStateChanged = event => {
    console.log('Call State Changed', event.detail);
};

let onWebRtcTrackChanged = event => {
    console.log('WebRTC Track Changed', event.detail);
};

var onLoaded = function onLoaded() {
    console.log('[DEMO] :: On SDK Loaded !');

    rainbowSDK
        .initialize('APP ID', 'APP SECRET')
        .then(() => {
            console.log('[DEMO] :: Rainbow SDK is initialized!');
            rainbowSDK.connection
                .signin('LOGIN', 'PASSWORD')
                .then(account => {
                    console.log('User Connected >', account.userData.displayName);

                    rainbowSDK.contacts.searchByLogin('OTHER USER LOGIN').then(contact => {
                        rainbowSDK.conversations.openConversationForContact(contact).then(conversation => {
                            const bubbles = rainbowSDK.bubbles.getAllBubbles(conversation);
                            for (let i = 0; i < bubbles.length; i++) {
                                if (bubbles[i].name === 'HARDCODED BUBBLE NAME') {
                                    bubble = bubbles[i];
                                    console.log('Found bubble', bubble.name);
                                    rainbowSDK.bubbles
                                        .startOrJoinWebRtcConference(bubble)
                                        .then(bubble => {
                                            console.log('joined conference', bubble);
                                        })
                                        .catch(err => console.log('Cant join conference', err));
                                }
                            }
                        });
                    });
                })
                .catch(err => console.log('ERROR', err));
        })
        .catch(err => {
            console.log('[DEMO] :: Something went wrong with the SDK.', err);
        });
};

let button = document.getElementById('makeWebRTCCall');
button.onclick = function makeWebRTCCall() {
    rainbowSDK.contacts
        .searchByLogin('OTHER USER LOGIN')
        .then(contact => {
            console.log('Retrieved contact!', contact.displayName, contact);
            rainbowSDK.im.sendMessageToConversation(contact.conversation, 'ES6 TEST HERE');
            rainbowSDK.webRTC.callInAudio(contact);
        })
        .catch(err => console.log(err));
};

document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);

document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded);
document.addEventListener(rainbowSDK.webRTC.RAINBOW_ONWEBRTCTRACKCHANGED, onWebRtcTrackChanged);
document.addEventListener(rainbowSDK.RAINBOW_ONWEBRTCCALLSTATECHANGED, onCallStateChanged);
rainbowSDK.load();

window.r = rainbowSDK;
