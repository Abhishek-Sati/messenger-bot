import { RequestHandler } from "express"
import { handleMessage, handlePostback } from "../services/webhook"
import { saveMessage } from "../repositories/message"


export const getWebHook: RequestHandler = (req, res, next) => {
    try {
        // Parse the query params
        let mode = req.query['hub.mode']
        let token = req.query['hub.verify_token']
        let challenge = req.query['hub.challenge']

        // Checks if a token and mode is in the query string of the request
        if (mode && token) {

            // Checks the mode and token sent is correct
            if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {

                // Responds with the challenge token from the request
                console.log('WEBHOOK_VERIFIED')
                res.status(200).send(challenge)

            } else {
                // Responds with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403)
            }
        }
    } catch (e) {
        next(e)
    }
}

export const postWebHook: RequestHandler = (req, res, next) => {
    try {
        // Parse the request body from the POST
        let body = req.body

        // Check the webhook event is from a Page subscription
        if (body.object === 'page') {

            // Iterate over each entry - there may be multiple if batched
            body.entry.forEach(function (entry: { messaging: any[] }) {

                // Gets the body of the webhook event
                let webhook_event = entry.messaging[0]
                console.log('webhook event : ', webhook_event)

                // Get the sender PSID
                let sender_psid = webhook_event.sender.id
                console.log('Sender PSID: ' + sender_psid)

                // Check if the event is a message or postback and
                // pass the event to the appropriate handler function
                if (webhook_event.message) {
                    saveMessage(webhook_event.message?.text)
                    handleMessage(sender_psid, webhook_event.message)
                } else if (webhook_event.postback) {
                    handlePostback(sender_psid, webhook_event.postback)
                }

            })

            // Return a '200 OK' response to all events
            res.status(200).send('EVENT_RECEIVED')

        } else {
            // Return a '404 Not Found' if event is not from a page subscription
            res.sendStatus(404)
        }
    } catch (e) {
        next(e)
    }
}