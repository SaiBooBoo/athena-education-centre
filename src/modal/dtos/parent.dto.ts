import type { StudentSummaryDto } from "./dtos";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type ParentType = "FATHER" | "MOTHER" | "GUARDIAN";




export type ParentDto = {
  id: number;
  username: string;
  displayName: string;
  gender: Gender;
  nrcNumber: string;
  dob: string; // ISO date string
  job: string;
  phoneNumber: string;
  address: string;
  parentType: ParentType;
  students: StudentSummaryDto[]
};