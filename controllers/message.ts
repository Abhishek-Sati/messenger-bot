import { RequestHandler } from "express"
import { deleteMessageById, getAllMessages, getMessageById } from "../services/message"


export const getAllMessagesController: RequestHandler = async (req, res, next) => {
    try {
        const response: any = getAllMessages()
        res.status(200).send({ data: response, count: response.length })
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

