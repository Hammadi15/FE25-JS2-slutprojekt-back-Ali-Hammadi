import express from "express";
import fs from "fs/promises";
import cors from "cors";

export const app = express();
app.use(express.json())
app.use(cors());




