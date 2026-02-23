import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Stats } from './components/stats/stats';
import { ClientList } from './components/client-list/client-list';
import { FigmaComponent } from './components/figma/figma';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard]
    },
    {
        path: 'stats',
        component: Stats,
        canActivate: [authGuard]
    },
    {
        path: 'clients',
        component: ClientList,
        canActivate: [authGuard]
    },
    {
        path: 'figma',
        component: FigmaComponent,
        canActivate: [authGuard]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
