# messenger-bot

App Info: 

This app is deployed on heroku server.
For persisting messages, we are using postgres database, with the help of heroku-postgres plugin.
For processing different messages from user we are using facebook's built in NLP.
This app contains following APIs.

APIs :

1. GET: https://messenger-bot-be.herokuapp.com/api/v1/messages -> for getting all messages.
2. GET: https://messenger-bot-be.herokuapp.com/api/v1/messages/:message_id -> for getting a specific message using message id.
3. DELETE: https://messenger-bot-be.herokuapp.com/api/v1/messeges/:message_id -> for deleting a specific message.
