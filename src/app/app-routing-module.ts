import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Projects } from './pages/projects/projects';
import { Contact } from './pages/contact/contact';
import { Login } from './admin-pages/login/login';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'contact', component: Contact },
  //admin-pages
  { path: 'admin-login', component: Login },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
