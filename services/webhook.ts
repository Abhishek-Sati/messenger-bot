// Handles messages events
import request from 'request'


// function handleMessage(sender_psid: string, received_message: { text: string }) {
//     let response
//
//     // Check if the message contains text
//     if (received_message.text) {
//
//         // Create the payload for a basic text message
//         response = {
//             "text": `You sent the message: "${received_message.text}". Now send me an image!`
//         }
//     }
//
//     // Sends the response message
//     callSendAPI(sender_psid, response)
// }


// Handles messaging_postbacks events
function handlePostback(sender_psid: string, received_postback: string) {

}


// Sends response messages via the Send API
function callSendAPI(sender_psid: string, response: any) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": { text: response }
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": process.env.FACEBOOK_PAGE_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!', response)
        } else {
            console.error("Unable to send message:" + err)
        }
    })
}


type NLPType = {
    entities: any
    traits: { [x: string]: any[] }
}


function firstTrait(nlp: NLPType, name: string) {
    return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0]
}


function handleMessage(sender_psid: string, received_message: { text: string, nlp: NLPType }) {
    // check greeting is here and is confident
    const greeting = firstTrait(received_message.nlp, 'wit$greetings')
    if (greeting && greeting.confidence > 0.8) {
        callSendAPI(sender_psid, 'Hi there!')
    } else {
        // default logic
        callSendAPI(sender_psid, 'Default Message')
    }
}