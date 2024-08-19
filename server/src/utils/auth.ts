import { Request } from "express";
import { openMongoDBConn } from "../infra/mongo";
import { IUser, UserModel } from "../model/UserModel";

export async function verifyToken(req: Request): Promise<IUser> {
    const reqHeaders = req.headers;

    const authorizationHeader = reqHeaders.authorization;
    if (authorizationHeader) {
        const [scheme, token] = authorizationHeader?.split(' ');

        if (scheme === "bearer") {
            if (token) {
                await openMongoDBConn();
                const user = await UserModel.findOne({ accessToken: token }).exec();
                if (user) {
                    return user
                }
            }
        }
    }

    throw new Error("Unauthorize")
}