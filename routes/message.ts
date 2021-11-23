import { Router } from "express"
import { deleteMessageByIdController, getAllMessagesController, getMessageByIdController } from "../controllers/message"


export const messageRouter = Router()

messageRouter.get('/', getAllMessagesController)

messageRouter.get('/:message_id', getMessageByIdController)

messageRouter.delete('/:message_id', deleteMessageByIdController)