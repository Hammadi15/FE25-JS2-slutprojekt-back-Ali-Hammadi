import { Router } from "express";
import type { Request, Response } from "express";
import {
  addAssignment,
  getAssignments,
  deleteAssignment,
  updateAssignmentStatus,
  assignMemberToAssignment,
  markAssignmentAsDone,
} from "../dataService";
import crypto from "crypto";
import { Assignment } from "../types";

export const assignmentsRouter = Router();

assignmentsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const assignments = await getAssignments();
    res.json(assignments);
  } catch (error) {
    console.log("hej", error);
    res.status(500).json({ message: "Server error" });
  }
});

assignmentsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newAssignment: Assignment = {
      id: crypto.randomUUID(),
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      status: "new", //
      timestamp: new Date().toLocaleString("sv-SE", {
        timeZone: "Europe/Stockholm",
      }),
    };

    const saved = await addAssignment(newAssignment);
    res.status(202).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

assignmentsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteAssignment(id);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

assignmentsRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedAssignment = await updateAssignmentStatus(id, status);

    res.json(updatedAssignment);
  } catch (error) {
    if (error instanceof Error && error.message === "Assignment not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Server error" });
  }
});

assignmentsRouter.patch("/:id/assign", async (req, res) => {
  try {
    const { id } = req.params;
    const { memberId } = req.body;

    const updated = await assignMemberToAssignment(id, memberId);

    res.json(updated);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Assignment not found" ||
        error.message === "Member not found"
      ) {
        return res.status(404).json({ message: error.message });
      }

      if (error.message === "Category mismatch") {
        return res.status(400).json({ message: error.message });
      }
    }

    res.status(500).json({ message: "Server error" });
  }
});

assignmentsRouter.patch("/:id/done", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await markAssignmentAsDone(id);
    res.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === "Assignment not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Server error" });
  }
});
