import { DrawerModule } from 'primeng/drawer';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HttpClient, provideHttpClient , withFetch,HttpClientModule} from '@angular/common/http';import { AppRoutingModule } from './app-routing-module';
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
import { EditorModule } from 'primeng/editor';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { Business } from './pages/business/business';
import { Followup } from './pages/followup/followup';
import { Delivery } from './pages/delivery/delivery';
import { MenubarModule } from 'primeng/menubar';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { CreateFacilities } from './admin-pages/facilitie/create-facilities/create-facilities';
import { CreateUnits } from './admin-pages/unit/create-units/create-units';
import { CreateProject } from './admin-pages/project/create-project/create-project';
import { CreateRegions } from './admin-pages/region/create-regions/create-regions';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { GalleriaModule } from 'primeng/galleria';
import { StepperModule } from 'primeng/stepper';

// ngx-translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
import { Counters } from './components/counters/counters';
import { RegionDetails } from './pages/projects/region-details/region-details';
import { ProjectDetails } from './pages/projects/project-details/project-details';
import { ViewProjectDetails } from './pages/projects/project-details/view-project-details/view-project-details';
import { ViewUnitDetails } from './pages/projects/project-details/view-unit-details/view-unit-details';
import { ConstructionDetails } from './pages/followup/construction-details/construction-details';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    Drawerside,
    CreateRegions,
    CreateFacilities,
    CreateProject,
    CreateUnits,
    Business,
    Followup,
    Delivery,
    ViewRegions,
    ViewFacilities,
    ViewProjects,
    ViewUnits,
    EditRegions,
    EditFacilities,
    EditProject,
    EditUnit,
    CreateConstructionUpdate,
    ViewConstructionUpdate,
    EditConstructionUpdate,
    Counters,
    RegionDetails,
    ProjectDetails,
    ViewProjectDetails,
    ViewUnitDetails,
    ConstructionDetails
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    FormsModule,        
    ReactiveFormsModule ,
    DrawerModule,
    TableModule,
    Ripple ,
    StyleClass,
    BrowserAnimationsModule,
    EditorModule ,
    TextareaModule,
    DatePickerModule ,
    MenubarModule,
    StepperModule,
    CarouselModule,
    DialogModule,
    SelectModule,
    MultiSelectModule,
    ToggleSwitchModule,
    GalleriaModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })    
  ],
  providers: [
    AuthGuard,
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
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
