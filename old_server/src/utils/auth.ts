import { Request } from "express";
import { openMongoDBConn } from "../infra/mongo";
import { IUser, UserModel } from "../model/UserModel";

type Cookie = {
    accessToken: string;
}

export async function verifyToken(req: Request): Promise<IUser> {
    const cookies: Cookie = req.cookies;
    if (cookies) {
        await openMongoDBConn();
        const user = await UserModel.findOne({ accessToken: cookies.accessToken }).exec();
        if (user) {
            return user
        }
    }

    throw new Error("Unauthorize")
}