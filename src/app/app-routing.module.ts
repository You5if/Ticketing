import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "./components/security/user/change-password/change-password.component";
import { DashboardComponent } from "./components/dynamic/dashboard/dashboard.component";
import { LoginComponent } from "./components/security/auth/login/login.component";
import { WelcomeComponent } from "./components/dynamic/welcome/welcome.component";
import { AuthGuard } from "./components/security/auth/auth-guard";
import { CountryComponent } from "./components/security/admin/regional/country/country.component";
import { CityComponent } from "./components/security/admin/regional/city/city.component";
import { ReportPageComponent } from "./components/PR/report-page/report-page.component";
import { NotActivatedComponent } from "./components/dynamic/notactivated/notactivated.component";
import { SignUpComponent } from "./components/security/signup/signup.component";
import { AccountActivatedComponent } from "./components/dynamic/accountactivated/accountactivated.component";
import { RegistrationExpiredComponent } from "./components/dynamic/registrationexpired/registrationexpired.component";
import { ChangePasswordAnonComponent } from "./components/dynamic/change-passwordanon/change-passwordanon.component";
import { SDBatchVehicleEntryComponent } from "./components/AlaadinShipping/sdbatchvehicleentry/sdbatchvehicleentry.component";
import { SDVehicleDetailComponent } from "./components/AlaadinShipping/sdvehicledetail/sdvehicledetail.component";
import { SDShippingLineCompaniesComponent } from "./components/AlaadinShipping/sdshippinglinecompanies/sdshippinglinecompanies.component";
import { SDDispatchPlanComponent } from "./components/AlaadinShipping/sddispatchplan/sddispatchplan.component";
import { SDDispatchPlanExpenseComponent } from "./components/AlaadinShipping/sddispatchplanexpense/sddispatchplanexpense.component";
import { SignUpContComponent } from "./components/security/signupcont/signup.component";
// import { LoginAppComponent } from "./components/security/auth/loginapp/login.component";
// import { LoginGoogleComponent } from "./components/security/auth/logingoogle/login.component";
import { SDCarMakeComponent } from "./components/AlaadinShipping/sdcarmake/sdcarmake.component";
import { SDCarModelComponent } from "./components/AlaadinShipping/sdcarmodel/sdcarmodel.component";
import { SDUserComponent } from "./components/AlaadinShipping/sduser/sduser.component";
import { SDDispatchPlanPaymentComponent } from "./components/AlaadinShipping/sddispatchplanpayment/sddispatchplanpayment.component";
import { SDCompanyComponent } from "./components/AlaadinShipping/sdcompany/sdcompany.component";
import { AdminGuard } from "./components/security/Guard/admin.guard";
import { StaffGuard } from "./components/security/Guard/staff.guard";
import { ReportPageEmailComponent } from "./components/PR/report-pageemail/report-pageemail.component";

import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { LandingComponent } from "./Ticketing/landing/landing.component";
import { ClientUserComponent } from "./Ticketing/clientuser/clientuser.component";
import { ProblemCatComponent } from "./Ticketing/problemcat/problemcat.component";
import { ProbSubComponent } from "./Ticketing/probsub/probsub.component";
import { ProbTechComponent } from "./Ticketing/probtech/probtech.component";
import { UnDepartmentComponent } from "./Ticketing/undepartment/undepartment.component";
import { UnCustomerComponent } from "./Ticketing/uncustomer/uncustomer.component";
import { PolicyComponent } from "./Ticketing/policy/policy.component";
import { EndorsementComponent } from "./Ticketing/endorsement/endorsement.component";
import { NavbarComponent } from "./Ticketing/navbar/navbar.component";
import { Navbar2Component } from "./Ticketing/navbar2/navbar.component";
import { TicketComponent } from "./Ticketing/ticket/ticket.component";
import { ProbAgentComponent } from "./Ticketing/probagent/probagent.component";
import { CallCenterComponent } from "./Ticketing/call-center/call-center.component";
import { NewClientComponent } from "./Ticketing/new-client/new-client.component";
import { KnownClientComponent } from "./Ticketing/known-client/known-client.component";
import { AppNotificationComponent } from "./Ticketing/appnotification/appnotification.component";
import { ReportComponent } from "./report/report.component";
import { DashboardModuleComponent } from "./Ticketing/dashboard-module/dashboard-module.component";
import { DashboardDetailsComponent } from "./Ticketing/dashboard-module/dashboard-details/dashboard-details.component";
import { AdminTicketComponent } from "./Ticketing/admin-ticket/ticket.component";


const routes: Routes = [
  { path: "", component: LoginComponent },
  
  
  {
    path: "welcome",
    component: WelcomeComponent,
    data: { title: "Premium Quality Shipping" },
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login to get access to an instant service" },
  },
  
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      // { path: "dashboard", component: DashboardComponent },
      { path: "dynamic", component: DynamicFormComponent },
      // { path: "Fadel", component: Navbar2Component },
      { path: "System", component: Navbar2Component , children: [
        { path: '', redirectTo: 'Home', pathMatch: 'full' },
        { path: "Home", component: LandingComponent},
      { path: "Users", component: ClientUserComponent },
      { path: "ProblemCat", component: ProblemCatComponent },
      { path: "ProbSub", component: ProbSubComponent },
      { path: "ProbTech", component: ProbTechComponent },
      { path: "UnDepartment", component: UnDepartmentComponent },
      { path: "Ticket", component: TicketComponent },
      { path: "AdminTicket", component: AdminTicketComponent },
      { path: "UnCustomer", component: UnCustomerComponent },
      { path: "Policy", component: PolicyComponent },
      { path: "Endorsement", component: EndorsementComponent },
      { path: "Agent", component: ProbAgentComponent },
      { path: "Notification", component: AppNotificationComponent },
      { path: "Report", component: ReportComponent },
      { path: "CallCenter", component: CallCenterComponent },
      { path: "Details", component: DashboardDetailsComponent },
      { path: "Dashboard", component: DashboardModuleComponent},
      { path: "Custom", component: KnownClientComponent },
      { path: "TechnicianReport", component: ReportPageComponent },
      { path: ':id', component: NewClientComponent },
      ]},
      
      
      //  { path: 'dohinv', component: InventoriesComponent },
      {
        path: "signup",
        component: SignUpComponent,
        data: { title: "Create an account for the best services" },
        canActivate: [AdminGuard],
      },
      {
        path: "report",
        component: ReportPageComponent,
      },
      // { path: 'sdvhclebatch', component: SDBatchVehicleEntryComponent, data: { title: 'Get your vehicle deliveried' } },
      
      
    ],
  },
  { path: "**", redirectTo: "welcome", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
