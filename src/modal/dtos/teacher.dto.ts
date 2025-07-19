import type { StudentSummaryDto } from "./dtos";
import { Gender } from "./parent.dto";
import type { Subject } from "./student.dto";

export type TeacherDto = {
    id: number,
    username: string,
    password: string,
    displayName: string,
    nrcNumber: string,
    qualification: string,
    dob: string,
    phone: string,
    address: string,
    earning: number,
    subject: Subject,
    profileImagePath: string | null,
    gender : Gender,
    students: StudentSummaryDto[],
}

export type Teacher = {
    id: number,
    username: string,
    password: string,
    displayName: string,
    nrcNumber: string,
    qualification: string,
    dob: string,
    phone: string,
    address: string,
    earning: number,
    subject: Subject,
    profileImagePath: string | null,
    gender : Gender,
    students: StudentSummaryDto[],
}