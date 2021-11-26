import { RequestHandler } from "express"
import { deleteMessageById, getAllMessages, getMessageById } from "../services/message"
import { getRedisClientCache } from "../utils/helpers"
import { RedisCachedKeys } from "../utils/types"


export const getAllMessagesController: RequestHandler = async (req, res, next) => {
    try {
        getRedisClientCache(RedisCachedKeys.ALL_MESSAGES, getAllMessages, res)
    } catch (error) {
        next(error)
    }
}

export const getMessageByIdController: RequestHandler<{ message_id: string }> = async (req, res, next) => {
    const { message_id } = req.params
    try {
        const response = await getMessageById(message_id)
        res.status(200).send({ data: response })
    } catch (e) {
        next(e)
    }
}

export const deleteMessageByIdController: RequestHandler<{ message_id: string }> = async (req, res, next) => {
    const { message_id } = req.params
    try {
        const response = await deleteMessageById(message_id)
        res.status(200).send({ data: response })
    } catch (e) {
        next(e)
    }
}

