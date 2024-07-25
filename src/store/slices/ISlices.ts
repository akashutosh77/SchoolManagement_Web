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
  isLoggedInWithGoogle: boolean ;
  isLoggedInWithUserNamePassword: boolean ;
  // Add other fields as necessary
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}