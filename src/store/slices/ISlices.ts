export interface IUserState {
  userId: number | null;
  name: string;
  email: string;
  schoolId: number | null;
  roleId: number | null;
  roleName: string | null;
  sub: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;
  email_verified: boolean;
  isLoggedInWithGoogle: boolean;
  isLoggedInWithUserNamePassword: boolean;
  // Add other fields as necessary
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IAttendance {
  schoolId?: number;
  classId?: number;
  studentId?: number;
  schoolName?: string;
  className?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  studentCreatedAt?: Date;
  studentUpdatedAt?: Date;
  isStudentActive?: boolean;
  admissionDate?: Date;
  photoURL?: string;
  attendanceDate?: Date;
  attendanceStatus?: string;
  remarks?: string;
}

export interface IStudent {
  schoolId?: number;
  classId?: number;
  studentId?: number;
  schoolName?: string;
  className?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  studentCreatedAt?: Date;
  studentUpdatedAt?: Date;
  isStudentActive?: boolean;
  admissionDate?: Date;
  photoURL?: string;
}
export interface IAttendanceProps {
  attendanceData: IAttendance[];
  studentsData: IStudent[];
  // Add other fields as necessary
  status?: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}
