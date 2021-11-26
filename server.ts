import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import bodyParser from "body-parser"
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

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(morganMiddleware)

app.use(express.static('./views/public'))

app.set('view engine', 'ejs')

app.set('views', './views/src')

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.render('./chatbot')
})

app.use(appRouter)

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
