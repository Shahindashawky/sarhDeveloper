import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Projects } from './pages/projects/projects';
import { Contact } from './pages/contact/contact';
import { Login } from './admin-pages/login/login';
import { AdminHome } from './admin-pages/admin-home/admin-home';
import { ChangePassword } from './admin-pages/change-password/change-password';
import { Business } from './pages/business/business';
import { Followup } from './pages/followup/followup';
import { Delivery } from './pages/delivery/delivery';
import { CreateRegions } from './admin-pages/region/create-regions/create-regions';
import { CreateFacilities } from './admin-pages/facilitie/create-facilities/create-facilities';
import { CreateProject } from './admin-pages/project/create-project/create-project';
import { CreateUnits } from './admin-pages/unit/create-units/create-units';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'contact', component: Contact },
  { path: 'business', component: Business },
  { path: 'followup', component: Followup },
  { path: 'delivery', component: Delivery },

  { path: 'admin-login', component: Login },

  {
    path: 'admin-home',
    component: AdminHome,
    children: [
      { path: '', redirectTo: 'create-region', pathMatch: 'full' },
      { path: 'create-region', component: CreateRegions },
      { path: 'create-facilitie', component: CreateFacilities },
      { path: 'create-project', component: CreateProject },
      { path: 'create-unit', component: CreateUnits },
      { path: 'resetPassword', component: ChangePassword }
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
