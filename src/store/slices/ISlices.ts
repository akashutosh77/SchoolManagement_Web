export interface IUserState {
  userId: number | null;
  name: string;
  email: string;
  schoolId: number | null;
  roleId: number | null;
  // Add other fields as necessary
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}