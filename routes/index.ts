import { NextFunction, Request, Response, Router } from "express"
import { notFound } from "@hapi/boom"
import { messageRouter } from "./message"


export const appRouter = Router()

appRouter.use("/v1/messages", messageRouter)

appRouter.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(notFound("The API you are looking for doesn't exist"))
})
