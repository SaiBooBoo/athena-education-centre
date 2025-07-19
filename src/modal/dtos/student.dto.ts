import type { ParentSummaryDto } from "./dtos";

export type Subject = "MYANMAR" | "ENGLISH" | "MATH" | "SCIENCE" | "GEOGRAPHY" | "HISTORY" | "BIOLOGY" | "PHYSICS" | "CHEMISTRY" | "COMPUTER" | "SHARINGAN" | "NINJA" | "SAMURAI";
export type Gender = "MALE" | "FEMALE" | "OTHER";

export type StudentDto = {
  id: number;
  username: string;
  displayName: string;
  gender: Gender;
  dob: string; 
  address: string;
  grade: number;
  profileImagePath: string | null;
  parents: ParentSummaryDto[];
};

export interface Student {
  id: number;
  username: string;
  displayName: string;
  gender: Gender;
  dob: string;
  address: string;
  grade: number;
  profileImagePath: string | null;
  parents: ParentSummaryDto[];
}