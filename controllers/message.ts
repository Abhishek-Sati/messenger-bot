import { RequestHandler } from "express"
import { getAllMessages, getMessageById } from "../actions/message"


export const getAllMessagesController: RequestHandler = async (req, res, next) => {
    try {
        const response = await getAllMessages()
        res.status(200).send({ data: response })
    } catch (e) {
        next(e)
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