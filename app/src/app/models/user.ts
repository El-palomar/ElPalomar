export interface IUser {
  id: number;
  email: string;
  password: string;
  role: 'cliente' | 'admin'; // 👈 puede ser cliente o admin
  name: string;
}