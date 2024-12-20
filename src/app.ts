import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoute } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlwares/globalErrorHandler";
import notFound from "./app/middlwares/notFound";
import router from "./app/routes";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/", router);


app.get("/", (req: Request, res: Response) => {
  Promise.reject()
  // res.send('My server is running');
});


app.use(globalErrorHandler);

// not found
app.use(notFound)

export default app;
