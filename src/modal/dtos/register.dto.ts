import type { ParentType } from "./parent.dto"
import type { Gender, Subject } from "./student.dto"


export type RegisterDto = {
    username: string,
    password: string,
    displayName: string,
    nrcNumber?: string,
    gender : Gender,
    dob: string,
    job?: string,
    parentType ?: ParentType,
    image_url ?: string,
    subject ?: Subject[],
    address: string,
    grade?: string,
    phoneNumber ?: string,
    qualification ?: string,
    accountType: string
}