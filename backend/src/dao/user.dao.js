import userModel from "../models/user.model.js";

export async function createUser(data){
    try {
        const created = await userModel.create(data);
        console.log("DAO: createUser succeeded", { id: created._id.toString(), email: created.email });
        return created;
    } catch (err) {
        console.error("DAO: createUser error", err && err.message);
        throw err;
    }
}

export async function findUser(query) {
    try {
        const users = await userModel.find(query);
        return users;
    } catch (err) {
        console.error("DAO: findUser error", err && err.message);
        throw err;
    }
}

export async function findOneUser(query) {
    try {
        const u = await userModel.findOne(query).select("+password");
        return u;
    } catch (err) {
        console.error("DAO: findOneUser error", err && err.message);
        throw err;
    }
}