import { Gender } from "../../dtos/parent.dto";

export type StudentForm = {
    id:number,
    username: string,
    password: string,
    displayName: string,
    nrcNumber: string,
    gender: Gender,
    dob: string,
    address: string,
    grade: string,
    accountType: string,
    classroomName?: string,
    parents: number[],
}
    
