"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentsRouter = void 0;
const express_1 = require("express");
const dataService_1 = require("../dataService");
const crypto_1 = __importDefault(require("crypto"));
exports.assignmentsRouter = (0, express_1.Router)();
exports.assignmentsRouter.get("/", async (req, res) => {
    try {
        const assignments = await (0, dataService_1.getAssignments)();
        res.json(assignments);
    }
    catch (error) {
        console.log("hej", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.assignmentsRouter.post("/", async (req, res) => {
    try {
        const newAssignment = {
            id: crypto_1.default.randomUUID(),
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            status: "new", //
            timestamp: new Date().toLocaleString("sv-SE", {
                timeZone: "Europe/Stockholm",
            }),
        };
        const saved = await (0, dataService_1.addAssignment)(newAssignment);
        res.status(202).json(saved);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.assignmentsRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, dataService_1.deleteAssignment)(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.assignmentsRouter.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedAssignment = await (0, dataService_1.updateAssignmentStatus)(id, status);
        res.json(updatedAssignment);
    }
    catch (error) {
        if (error instanceof Error && error.message === "Assignment not found") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Server error" });
    }
});
exports.assignmentsRouter.patch("/:id/assign", async (req, res) => {
    try {
        const { id } = req.params;
        const { memberId } = req.body;
        const updated = await (0, dataService_1.assignMemberToAssignment)(id, memberId);
        res.json(updated);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "Assignment not found" ||
                error.message === "Member not found") {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === "Category mismatch") {
                return res.status(400).json({ message: error.message });
            }
        }
        res.status(500).json({ message: "Server error" });
    }
});
exports.assignmentsRouter.patch("/:id/done", async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await (0, dataService_1.markAssignmentAsDone)(id);
        res.json(updated);
    }
    catch (error) {
        if (error instanceof Error && error.message === "Assignment not found") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Server error" });
    }
});
