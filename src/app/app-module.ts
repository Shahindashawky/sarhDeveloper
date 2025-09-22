import { DrawerModule } from 'primeng/drawer';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { provideHttpClient } from '@angular/common/http';import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { Contact } from './pages/contact/contact';
import { Footer } from './components/footer/footer';
import { Login } from './admin-pages/login/login';
import { AdminHome } from './admin-pages/admin-home/admin-home';
import { ChangePassword } from './admin-pages/change-password/change-password';
import { Drawerside } from './components/drawer/drawer';
import { Ripple } from 'primeng/ripple';
import { StyleClass } from 'primeng/styleclass';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

@NgModule({
  declarations: [
    App,
    Header,
    Home,
    About,
    Projects,
    Contact,
    Footer,
    Login,
    AdminHome,
    ChangePassword,
    Drawerside
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    FormsModule,        
    ReactiveFormsModule ,
    DrawerModule,
    Ripple ,
    StyleClass,
    BrowserAnimationsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
