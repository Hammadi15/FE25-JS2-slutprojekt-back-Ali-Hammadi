import cors from "cors";
import express from "express";
import { membersRouter } from "./routes/membersRoutes";
import { assignmentsRouter } from "./routes/assigmentsRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/assignments", assignmentsRouter);
app.use("/members", membersRouter)

app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});