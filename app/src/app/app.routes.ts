import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';
import { MiCuenta } from './pages/mi-cuenta/mi-cuenta';
import { MiCuentaEditar } from './pages/mi-cuenta-editar/mi-cuenta-editar';

export const routes: Routes = [
    {path:"",component:Home},
    {path:"login",component:LoginPage},
    {path:"register", component:Register},
    {path: "dashboard", component: Dashboard},
    {path:"quienes_somos",component:QuienesSomos},
    {path:"mi_cuenta",component:MiCuenta},
    {path:"mi_cuenta_editar",component:MiCuentaEditar}
]