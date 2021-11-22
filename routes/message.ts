import { Router } from "express"
import { getAllMessagesController, getMessageByIdController } from "../controllers/message"


export const messageRouter = Router()

messageRouter.get('/', getAllMessagesController)

messageRouter.get('/:message_id', getMessageByIdController)