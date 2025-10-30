import app from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB();

app.listen(5000,()=>{
    console.log("server is running on port 5000")
})

// global error handlers to log uncaught exceptions/rejections to help debugging in dev
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown', err);
    // In production you might want to exit the process and restart
});