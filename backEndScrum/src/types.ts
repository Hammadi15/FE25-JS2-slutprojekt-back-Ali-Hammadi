export type Assignment = {
  id: string;
  title: string;
  description: string;
  category: "ux" | "frontend" | "backend";
  status: "new" | "doing" | "done";
  assignedTo?: string;
  timestamp: string;
};

export interface CreateAssignment {
  title: string;
  description: string;
  category: "ux" | "frontend" | "backend";
}

export type Member = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
  category: "ux" | "frontend" | "backend";
};

export type NewMember = {
  name: string;
};
export interface Database {
  assignments: Assignment[];
  members: Member[];
}

