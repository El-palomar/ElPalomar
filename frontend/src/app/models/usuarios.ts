export interface Usuario {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'user';
}
