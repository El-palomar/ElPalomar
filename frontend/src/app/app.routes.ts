import { Routes } from '@angular/router';
import { Home } from './pages/general/home/home';
import { LoginPage } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Dashboard } from './pages/dashboard/user-dashboard/dashboard';
import { QuienesSomos } from './pages/general/quienes-somos/quienes-somos';
import { MiCuenta } from './pages/user/mi-cuenta/mi-cuenta';
import { MiCuentaEditar } from './pages/user/mi-cuenta-editar/mi-cuenta-editar';
import { ActivityForm } from './pages/general/activity-form/activity-form';
import { FormularioActividadesComponent } from './components/features/formulario-actividades/formulario-actividades';
import { AdminDashboard } from './pages/dashboard/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginPage },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'quienes_somos', component: QuienesSomos },
  { path: 'mi_cuenta', component: MiCuenta },
  { path: 'mi_cuenta_editar', component: MiCuentaEditar },
  { path: 'actividades', component: FormularioActividadesComponent },
  { path: 'activity_form', component: ActivityForm },
  { path: 'admin_dashboard', component: AdminDashboard },
];
