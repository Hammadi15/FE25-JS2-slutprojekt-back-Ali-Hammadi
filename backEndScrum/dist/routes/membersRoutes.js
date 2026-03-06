"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.membersRouter = void 0;
const express_1 = require("express");
const dataService_1 = require("../dataService");
const crypto_1 = __importDefault(require("crypto"));
exports.membersRouter = (0, express_1.Router)();
exports.membersRouter.get("/", async (req, res) => {
    try {
        const members = await (0, dataService_1.getMembers)();
        console.log('get all members');
        res.json(members);
    }
    catch (error) {
        console.error('test', error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.membersRouter.post("/", async (req, res) => {
    try {
        const newMember = {
            id: crypto_1.default.randomUUID(),
            ...req.body,
        };
        const savedMember = await (0, dataService_1.addMemers)(newMember);
        res.status(201).json(newMember);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.membersRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, dataService_1.deleteMember)(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
