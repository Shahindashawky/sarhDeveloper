import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Projects } from './pages/projects/projects';
import { Contact } from './pages/contact/contact';
import { Login } from './admin-pages/login/login';
import { AdminHome } from './admin-pages/admin-home/admin-home';
import { ChangePassword } from './admin-pages/change-password/change-password';
import { CreateRegions } from './admin-pages/create-regions/create-regions';
import { CreateFeatures } from './admin-pages/create-features/create-features';
import { CreateProject } from './admin-pages/create-project/create-project';
import { CreateUnits } from './admin-pages/create-units/create-units';
import { Business } from './pages/business/business';
import { Followup } from './pages/followup/followup';
import { Delivery } from './pages/delivery/delivery';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'contact', component: Contact },
{ path: 'business', component: Business },
{ path: 'followup', component: Followup },
{ path: 'delivery', component: Delivery },


  //admin-pages
  { path: 'admin-login', component: Login },
   { path: 'admin-home', component: AdminHome },
      { path: 'resetPassword', component: ChangePassword },
    { path: 'create-region', component: CreateRegions },
        { path: 'create-feature', component: CreateFeatures },
    { path: 'create-project', component: CreateProject },
    { path: 'create-unit', component: CreateUnits },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
