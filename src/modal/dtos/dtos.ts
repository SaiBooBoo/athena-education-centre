
export type SignInForm = {
    name : string
    password : string
}
export type StudentSummaryDto ={
  id:number
  username: string
  displayName: string
  grade: number
  profileImagePath: string
}

export type ParentSummaryDto ={
  id:number
  displayName: string
  job: string
  phoneNumber: string
  nrcNumber: string
  address: string
  dob: string
  parentType: string
}

export type TeacherSummaryDto ={
  id:number
  displayName: string
  qualification: string
  phone: string
  subject: string
}

export type SubjectDto ={
  id: number;
  subjectName: string
}
