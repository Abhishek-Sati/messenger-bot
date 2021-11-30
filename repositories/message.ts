import knex from "../config/db"
import * as crypto from "crypto"
import { findMessageById } from "./common"


export const getAllMessages = () => {
    return knex.from('message').select([ 'message', 'message_id' ])
}

export const getMessageById = async (message_id: string) => {
    return findMessageById(message_id)
}

export const saveMessage = async (message: string) => {
    return await knex('message').insert({
        message,
        message_id: crypto.randomBytes(20).toString('hex')
    }).returning([ 'message_id', 'message' ])
}

export const deleteMessageById = (message_id: string) => {
    return knex.from('message').delete().where({ message_id })
}