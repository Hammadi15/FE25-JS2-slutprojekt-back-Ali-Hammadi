import { Router } from "express";
import type { Request, Response } from "express";
import { addMemers, getMembers , deleteMember} from "../dataService";
import crypto from "crypto";


export const membersRouter = Router();

membersRouter.get("/", async (req , res)=>{
    try {
        const members = await getMembers();
        console.log('get all members')
        res.json(members)
    } catch (error) {
        console.error('test', error)
    res.status(500).json({ message: "Server error" });
    }
})

membersRouter.post("/", async (req : Request, res: Response)=>{
    try {
        const newMember = {
            id:crypto.randomUUID(),
            ...req.body,
        };
        

        const savedMember = await addMemers(newMember);
        res.status(201).json(newMember);
    } catch (error) {
            res.status(500).json({ message: "Server error" });

    }
})

membersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteMember(id);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

