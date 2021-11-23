import knex from "../config/db"
import * as crypto from "crypto"


export const getAllMessages = async () => {
    return []
}

export const getMessageById = async (message_id: string) => {
    return ''
}

export const saveMessage = (message: string) => {
    return knex('message').insert({
        message,
        message_id: crypto.randomBytes(20).toString('hex')
    }).returning([ 'message_id', 'message' ])
}