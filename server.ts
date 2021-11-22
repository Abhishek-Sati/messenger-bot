import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import { ErrorHandler } from "./utils/types"
import { appRouter } from "./routes"
import { logger, morganMiddleware } from "./config/logs"


const app = express()

if (!process.env.PORT) {
    process.exit(1)
}

const PORT = process.env.PORT

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(morganMiddleware)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Messenger Bot")
})

app.use("/api", appRouter)

app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    logger.error(err)
    if (err.isBoom) return res.status(err.output.statusCode).json(err.output.payload)
    return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Something went wrong",
    })
})

app.listen(PORT, () => logger.debug(`Server is up & listening on port => ${PORT}`))
