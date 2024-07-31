import { Request, Response, Express } from "express";
import express from 'express'
import dataSource from "./db/dbConfig";
import router from "./routes/customer";
import { customErrorHandler, DefaultErrorHandler } from "./middleware/errorHandler";


const app = express();
const PORT = process.env.PORT || 5000;



app.use(express.json())
app.use(customErrorHandler)
app.use(DefaultErrorHandler)
app.use("/customer", router);


app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
})



dataSource.initialize().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});


app.listen(PORT, () => {
    console.log(`server is running on host: http://localhost:${PORT}`);
});

export default app;