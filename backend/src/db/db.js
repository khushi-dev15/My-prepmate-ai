import mongoose from "mongoose";
import config from "../config/config.js";

async function connectDB(){
    try {
        // print masked mongodb uri to help debugging which URI the process loaded
        try {
            const raw = config.mongodb_uri || '';
            const masked = raw ? (raw.length > 20 ? raw.slice(0, 20) + '...' + raw.slice(-10) : raw) : 'NOT_SET';
            console.log(`MongoDB URI (masked): ${masked}`);
            // helpful developer hint when running with local mongodb default
            if (raw && (raw.includes('localhost') || raw.includes('127.0.0.1'))) {
                console.warn('Warning: MONGODB_URI points to a local MongoDB (localhost). If you want to use your Atlas cluster, update backend/.env MONGODB_URI to your Atlas connection string and restart the server.');
            }
            // For debugging: if DEBUG_DB=true in .env, print the full URI (useful for verifying Atlas string locally)
            try {
                if (process.env.DEBUG_DB === 'true') {
                    console.log('MongoDB URI (full - DEBUG_DB=true):', raw);
                }
            } catch (dbgErr) {
                // don't fail startup if DEBUG_DB read fails
            }
        } catch (e) {
            console.log('MongoDB URI (masked): <error while reading>');
        }
        // recommended options
        mongoose.set('strictQuery', false);
        // connect without deprecated options; Mongoose/Node driver v4+ ignores them
        const conn = await mongoose.connect(config.mongodb_uri);
        const db = mongoose.connection;
        console.log("connected to db", { host: db.host, name: db.name });
    } catch (err) {
        console.error("error in connecting to db", err && err.stack ? err.stack : err);
        throw err;
    }
}

export default connectDB;