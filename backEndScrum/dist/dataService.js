"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAssignmentAsDone = exports.assignMemberToAssignment = exports.updateAssignmentStatus = exports.deleteMember = exports.deleteAssignment = exports.addMemers = exports.getMembers = exports.addAssignment = exports.getAssignments = exports.writeData = exports.readData = void 0;
const fs_1 = require("fs");
const DATA_PATH = "./public/data.json";
const readData = async () => {
    try {
        const data = await fs_1.promises.readFile(DATA_PATH, "utf-8");
        return JSON.parse(data);
    }
    catch (erorr) {
        throw erorr;
    }
};
exports.readData = readData;
const writeData = async (data) => {
    try {
        await fs_1.promises.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
    }
    catch (error) {
        throw error;
    }
};
exports.writeData = writeData;
const getAssignments = async () => {
    try {
        const data = await (0, exports.readData)();
        return data.assignments;
    }
    catch (error) {
        throw error;
    }
};
exports.getAssignments = getAssignments;
const addAssignment = async (assignment) => {
    const data = await (0, exports.readData)();
    data.assignments.push(assignment);
    await (0, exports.writeData)(data);
    return assignment;
};
exports.addAssignment = addAssignment;
const getMembers = async () => {
    try {
        const data = await (0, exports.readData)();
        return data.members;
    }
    catch (error) {
        throw error;
    }
};
exports.getMembers = getMembers;
const addMemers = async (member) => {
    const data = await (0, exports.readData)();
    data.members.push(member);
    await (0, exports.writeData)(data);
    return member;
};
exports.addMemers = addMemers;
const deleteAssignment = async (id) => {
    const data = await (0, exports.readData)();
    const assignmentExists = data.assignments.some((assignment) => assignment.id === id);
    if (!assignmentExists) {
        throw new Error("Member not found");
    }
    data.assignments = data.assignments.filter((assignment) => assignment.id !== id);
    await (0, exports.writeData)(data);
    return { message: "Assignment deleted" };
};
exports.deleteAssignment = deleteAssignment;
const deleteMember = async (id) => {
    const data = await (0, exports.readData)();
    const memberExists = data.members.some((member) => member.id === id);
    if (!memberExists) {
        throw new Error("Member not found");
    }
    data.members = data.members.filter((member) => member.id !== id);
    await (0, exports.writeData)(data);
    return { message: "Member deleted" };
};
exports.deleteMember = deleteMember;
const updateAssignmentStatus = async (id, status) => {
    const data = await (0, exports.readData)();
    const assignment = data.assignments.find((a) => a.id === id);
    if (!assignment) {
        throw new Error("Assignment not found");
    }
    assignment.status = status;
    await (0, exports.writeData)(data);
    return assignment;
};
exports.updateAssignmentStatus = updateAssignmentStatus;
const assignMemberToAssignment = async (assignmentId, memberId) => {
    const data = await (0, exports.readData)();
    const assignment = data.assignments.find((a) => a.id === assignmentId);
    if (!assignment) {
        throw new Error("Assignment not found");
    }
    const member = data.members.find((m) => m.id === memberId);
    if (!member) {
        throw new Error("Member not found");
    }
    if (assignment.category !== member.category) {
        throw new Error("Category mismatch");
    }
    assignment.assignedTo = member.id;
    assignment.status = "doing";
    await (0, exports.writeData)(data);
    return assignment;
};
exports.assignMemberToAssignment = assignMemberToAssignment;
const markAssignmentAsDone = async (id) => {
    try {
        const data = await (0, exports.readData)();
        const assignment = data.assignments.find((a) => a.id === id);
        if (!assignment) {
            throw new Error("Assignment not found");
        }
        if (assignment.status === "done") {
            throw new Error("Assignment already done");
        }
        assignment.status = "done";
        await (0, exports.writeData)(data);
        return assignment;
    }
    catch (error) {
        throw error;
    }
};
exports.markAssignmentAsDone = markAssignmentAsDone;
