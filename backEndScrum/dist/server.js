"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const membersRoutes_1 = require("./routes/membersRoutes");
const assigmentsRoutes_1 = require("./routes/assigmentsRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/assignments", assigmentsRoutes_1.assignmentsRouter);
app.use("/members", membersRoutes_1.membersRouter);
app.listen(3000, () => {
    console.log("Server running on port 3000 🚀");
});
