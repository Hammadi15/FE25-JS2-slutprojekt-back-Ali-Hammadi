import { promises as fs } from "fs";
import { Assignment, Database, Member } from "./types";
const DATA_PATH = "./public/data.json";

export const readData = async (): Promise<Database> => {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch (erorr) {
    throw erorr;
  }
};
export const writeData = async (data: Database) => {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    throw error;
  }
};

export const getAssignments = async (): Promise<Assignment[]> => {
  try {
    const data = await readData();
    return data.assignments;
  } catch (error) {
    throw error;
  }
};

export const addAssignment = async (
  assignment: Assignment,
): Promise<Assignment> => {
  const data = await readData();
  data.assignments.push(assignment);
  await writeData(data);
  return assignment;
};

export const getMembers = async (): Promise<Member[]> => {
  try {
    const data = await readData();
    return data.members;
  } catch (error) {
    throw error;
  }
};

export const addMemers = async (member: Member): Promise<Member> => {
  const data = await readData();
  data.members.push(member);
  await writeData(data);
  return member;
};

export const deleteAssignment = async (id: string) => {
  const data = await readData();

  const assignmentExists = data.assignments.some(
    (assignment) => assignment.id === id,
  );

  if (!assignmentExists) {
    throw new Error("Member not found");
  }

  data.assignments = data.assignments.filter(
    (assignment) => assignment.id !== id,
  );

  await writeData(data);

  return { message: "Assignment deleted" };
};

export const deleteMember = async (id: string) => {
  const data = await readData();

  const memberExists = data.members.some((member) => member.id === id);

  if (!memberExists) {
    throw new Error("Member not found");
  }

  data.members = data.members.filter((member) => member.id !== id);

  await writeData(data);

  return { message: "Member deleted" };
};

export const updateAssignmentStatus = async (
  id: string,
  status: "new" | "doing" | "done",
) => {
  const data = await readData();

  const assignment = data.assignments.find((a) => a.id === id);

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  assignment.status = status;

  await writeData(data);

  return assignment;
};



export const assignMemberToAssignment = async (
  assignmentId: string,
  memberId: string
) => {
  const data = await readData();

  const assignment = data.assignments.find(
    (a) => a.id === assignmentId
  );

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  const member = data.members.find(
    (m) => m.id === memberId
  );

  if (!member) {
    throw new Error("Member not found");
  }

  if (assignment.category !== member.category) {
    throw new Error("Category mismatch");
  }

  assignment.assignedTo = member.id;
    assignment.status = "doing";


  await writeData(data);

  return assignment;
};


export const markAssignmentAsDone = async (id: string) => {
    try{
  const data = await readData();
  const assignment = data.assignments.find((a) => a.id === id);

 if (!assignment) {
    throw new Error("Assignment not found");
  }

 if (assignment.status === "done") {
    throw new Error("Assignment already done");
  }



  assignment.status = "done";

  await writeData(data);

  return assignment;

  } catch (error) {
    throw error;
  }
};
