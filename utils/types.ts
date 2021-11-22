import { ErrorRequestHandler } from "express"


export interface ErrorHandler extends ErrorRequestHandler {
    isBoom: boolean;
    output: {
        statusCode: number;
        payload: {
            status: number;
            error: string;
            message: string;
        };
    };
}

export enum NodeEnvironments {
    DEVELOPMENT = "development",
    STAGING = "staging",
    PRODUCTION = "production",
}
