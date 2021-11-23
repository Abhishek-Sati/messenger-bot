import knex from "../config/db"
import * as crypto from "crypto"
import { redisClient } from "../config/redis"
import { RedisCachedKeys } from "../utils/types"
import { findMessageById } from "./common"


export const getAllMessages = () => {
    return knex.from('message').select([ 'message', 'message_id', { fromBot: 'is_bot' }, 'type' ])
}

export const getMessageById = async (message_id: string) => {
    return findMessageById(message_id)
}

export const saveMessage = (message: string, type: string, is_bot: boolean = false) => {
    // delete redis cached data when db updates.
    redisClient.del(RedisCachedKeys.ALL_MESSAGES)

    return knex('message').insert({
        type,
        is_bot,
        message,
        message_id: crypto.randomBytes(20).toString('hex')
    }).returning([ 'message_id', 'message' ])
}

export const deleteMessageById = (message_id: string) => {
    return knex.from('message').delete().where({ message_id })
}