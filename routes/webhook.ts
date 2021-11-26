import { Router } from "express"
import { getWebHook, postWebHook } from "../controllers/webhook"


export const webHookRouter = Router()

webHookRouter.get('/', getWebHook)

webHookRouter.post('/', postWebHook)