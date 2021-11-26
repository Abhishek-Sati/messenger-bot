import { NextFunction, Request, Response, Router } from "express"
import { notFound } from "@hapi/boom"
import { messageRouter } from "./message"
import { webHookRouter } from "./webhook"


export const appRouter = Router()

appRouter.use("/api/v1/messages", messageRouter)
appRouter.use('/webhook', webHookRouter)

appRouter.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(notFound("The API you are looking for doesn't exist"))
})
