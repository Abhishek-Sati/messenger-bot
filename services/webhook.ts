// Handles messages events
import request from 'request'
import { saveMessage } from "../repositories/message"


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
    return nlp?.entities && nlp.traits?.[name]?.[0]
}


export function handleMessage(sender_psid: string, received_message: { text: string, nlp: NLPType }) {
    // check greeting is here and is confident
    const greetingList = [ 'wit$greetings', 'wit$datetime:$datetime', 'wit$thanks', 'wit$bye' ]
    let selectedGreeting
    let messageToSend = ''
    greetingList.forEach((greeting) => {
        if (firstTrait(received_message.nlp, greeting)?.confidence > 0.8) {
            selectedGreeting = greeting
        }
    })
    if (selectedGreeting === 'wit$greetings') {
        messageToSend = 'Hey, Enter your first Name!'
    } else if (selectedGreeting === 'wit$datetime:$datetime') {
        messageToSend = 'Do want to check number of days left for your next birthday?'
    } else if (selectedGreeting === 'wit$thanks') {
        messageToSend = 'Your Welcome'
    } else if (selectedGreeting === 'wit$bye') {
        messageToSend = 'Bye, have a nice day ahead!'
    } else {
        messageToSend = 'default'
    }
    callSendAPI(sender_psid, messageToSend)
    saveMessage(messageToSend)
}


// Handles messaging_postbacks events
export function handlePostback(sender_psid: string, received_postback: { payload: any }) {
    let response

    // Get the payload for the postback
    let payload = received_postback.payload

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response)
    if (response?.text) {
        saveMessage(response.text)
    }
}