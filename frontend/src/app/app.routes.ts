import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { UserdashboardComponent } from './users/userdashboard/userdashboard.component';
import { DiscoverComponent } from './users/discover/discover.component';
import { MyjobsComponent } from './users/myjobs/myjobs.component';
import { ProfileComponent } from './users/profile/profile.component';
import { SettingsComponent } from './users/settings/settings.component';
import { ChatComponent } from './users/chat/chat.component';
import { ClientdashboardComponent } from './client/clientdashboard/clientdashboard.component';
import { CreatejobComponent } from './client/createjob/createjob.component';
import { MytasksComponent } from './client/mytasks/mytasks.component';
import { RegisterComponent } from './register/register.component';
import { ClientchatComponent } from './client/clientchat/clientchat.component';
import { ClientprofileComponent } from './client/clientprofile/clientprofile.component';
import { DiscoverFreelancersComponent } from './client/discover-freelancers/discover-freelancers.component';
import { ClientsettingsComponent } from './client/clientsettings/clientsettings.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PaymentsComponent } from './client/payments/payments.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageJobsComponent } from './admin/manage-jobs/manage-jobs.component';
import { RatingsComponent } from './users/ratings/ratings.component';

export const routes: Routes = [
    {path: '', component:LandingComponent},
    {path: 'landing', pathMatch: 'full',redirectTo:''},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path:'userdashboard', component: UserdashboardComponent},
    {path:'discover', component: DiscoverComponent},
    {path:'myjobs', component: MyjobsComponent},
    {path:'profile', component: ProfileComponent},
    {path:'settings', component:SettingsComponent},
    {path:'chat', component:ChatComponent},
    {path:'clientdashboard', component: ClientdashboardComponent},
    {path:'createjobs', component: CreatejobComponent},
    {path:'mytasks', component: MytasksComponent},
    {path:'clientchat', component: ClientchatComponent},
    {path:'clientprofile', component: ClientprofileComponent},
    {path: 'discoverfreelancers', component: DiscoverFreelancersComponent},
    {path:'clientsettings', component:ClientsettingsComponent},
    {path:'admindashboard', component:AdminDashboardComponent},
    {path:'payments',component:PaymentsComponent},
    {path:'manageusers',component:ManageUsersComponent},
    {path:'managejobs', component:ManageJobsComponent},
    {path:'ratings', component:RatingsComponent}
];
