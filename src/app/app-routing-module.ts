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
import { AuthGuard } from './services/auth.guard';
import { ViewRegions } from './admin-pages/region/view-regions/view-regions';
import { ViewFacilities } from './admin-pages/facilitie/view-facilities/view-facilities';
import { ViewProjects } from './admin-pages/project/view-projects/view-projects';
import { ViewUnits } from './admin-pages/unit/view-units/view-units';
import { EditRegions } from './admin-pages/region/edit-regions/edit-regions';
import { EditFacilities } from './admin-pages/facilitie/edit-facilities/edit-facilities';
import { EditProject } from './admin-pages/project/edit-project/edit-project';
import { EditUnit } from './admin-pages/unit/edit-unit/edit-unit';
import { CreateConstructionUpdate } from './admin-pages/construction-update/create-construction-update/create-construction-update';
import { ViewConstructionUpdate } from './admin-pages/construction-update/view-construction-update/view-construction-update';
import { EditConstructionUpdate } from './admin-pages/construction-update/edit-construction-update/edit-construction-update';
import { RegionDetails } from './pages/projects/region-details/region-details';
import { ProjectDetails } from './pages/projects/project-details/project-details';
import { ViewProjectDetails } from './pages/projects/project-details/view-project-details/view-project-details';
import { ViewUnitDetails } from './pages/projects/project-details/view-unit-details/view-unit-details';


const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'contact', component: Contact },
  { path: 'business', component: Business },
  { path: 'followup', component: Followup },
  { path: 'delivery', component: Delivery },
  { path: 'region-details/:id', component: RegionDetails },
  { path: 'project-details/:id', component: ProjectDetails },
  { path: 'view-project-details/:id', component: ViewProjectDetails },
  { path: 'view-unit-details/:id', component: ViewUnitDetails },
  { path: 'admin-login', component: Login },

  {
    path: 'admin-home',
    component: AdminHome,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'create-region', pathMatch: 'full'},
      { path: 'create-region', component: CreateRegions},
      { path: 'view-region', component: ViewRegions},
      { path: 'edit-region/:id', component: EditRegions},
      { path: 'create-facilitie', component: CreateFacilities},
      { path: 'view-facilitie', component: ViewFacilities},
      { path: 'edit-facilitie/:id', component: EditFacilities},
      { path: 'create-project', component: CreateProject},
      { path: 'view-project', component: ViewProjects},
      { path: 'edit-project/:id', component: EditProject},
      { path: 'create-unit', component: CreateUnits},
      { path: 'view-unit', component: ViewUnits},
      { path: 'edit-unit/:id', component: EditUnit},
      { path: 'create-construction', component: CreateConstructionUpdate},
      { path: 'view-construction', component: ViewConstructionUpdate},
      { path: 'edit-construction/:id', component: EditConstructionUpdate},
      { path: 'resetPassword', component: ChangePassword}
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'disabled', 
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
