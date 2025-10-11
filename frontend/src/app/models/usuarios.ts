export interface IUsuario {
  id: number;
  email: string;
  password: string;
  nombre: string;
  role: 'admin' | 'user';
}
