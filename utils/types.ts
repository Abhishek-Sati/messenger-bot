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

export enum RedisCachedKeys {
    ALL_MESSAGES = "ALL_MESSAGES"
}

export enum MessageType {
    NAME = 'name',
    DOB = 'dob',
    DAYS_LEFT = 'days_left',
    END = 'end'
}