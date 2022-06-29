import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { RouterLinkActive } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';

import { AppGlobals } from 'src/app/app.global';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ChangePasswordNewComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class Navbar2Component implements OnInit {
  openNotification: boolean = true
  opened: boolean = true
  navWidth = ''
  open: boolean = true
  break: boolean = true;
  lang: string = "Arabic";
  direction: string = "ltr";
  Agent: string
  userManagement: string;
  callCenter:string;
  users: string;
  customerManagement: string;
  customers: string;
  policies: string;
  subSystem: string;
  endorsements: string;
  catagotries: string;
  supervisors: string;
  technicians: string;
  departments: string;
  tickets: string;
  resizeStyle: object = {};
  logout: string;
  change: string;
  showFiller = false;
  showButton: boolean = false;
  nameTitle: string;
  role = localStorage.getItem("role");
  langa = true;
  key: number;
  isOpen_YourVariable = true;

  testArray = [
    { message: "First notification", openNotification: true},
    { message: "Second notification", openNotification: false},
    { message: "Third notification", openNotification: false}
  ]

  lang_LS: string;
  changePassword: string;
  constructor(
    private _auth: AuthService,
    private titleService: Title,
    private _globals: AppGlobals,
    public dialog: MatDialog,) { }

  ngOnInit() {
    
    // this.startTimer()
    localStorage.setItem(this._globals.baseAppName + '_language', "16001")
    this.titleService.setTitle("Ticketing portal");
    // this.userId = this._auth.getUserName()
    this.logout = "Logout"
      this.change = "Language:"
      this.userManagement = "User management"
      this.subSystem = "Sub system"
      this.users = "Users"
      this.customerManagement = "Customer management"
      this.customers = "Customers"
      this.policies = "Policies"
      this.Agent = "Agents"
      this.callCenter = "Call center"
      this.endorsements = "Endorsements"
      this.catagotries = "Categories"
      this.supervisors = "Supervisors"
      this.technicians = "Technicians"
      this.departments = "Departments"
      this.tickets = "Tickets"
      
      this.changePassword = "Change password"
      this.nameTitle = localStorage.getItem(this._globals.baseAppName + '_title')

      
  }

  startTimer() {
    setInterval(() => {
      console.log("Hello this is Timer");
      this.openNotification = true
      
    },1000)
  }

  onSignOut() {
    this._auth.logout();
  }

  onChangeSite(site: string) {
    localStorage.setItem(this._globals.baseAppName + '_title', site)
    this.nameTitle = localStorage.getItem(this._globals.baseAppName + '_title')
  }

  onChangeLanguage() {
    
    
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.lang = "Arabic"
      this.direction = "ltr"
      this.langa = true
      this.changePassword = "Change password"
      this.logout = "Logout"
      this.change = "Language:"
      this.callCenter = "Call center"
      this.userManagement = "User management"
      this.users = "Users"
      this.customerManagement = "Customer management"
      this.subSystem = "Sub system"
      this.customers = "Customers"
      this.policies = "Policies"
      this.Agent = "Agents"
      this.endorsements = "Endorsements"
      this.catagotries = "Categories"
      this.supervisors = "Supervisors"
      this.technicians = "Technicians"
      this.departments = "Departments"
      this.tickets = "Tickets"
      
      
      this.lang_LS = "16001"
    }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.lang = "الانجليزية"
      this.lang_LS = "16002"
      this.direction = "rtl"
      this.langa = false
      this.changePassword = "تغيير كلمة السر"
      this.callCenter = "مركز التواصل"
      this.logout = "تسجيل الخروج"
      this.change = "اللغة:"
      this.Agent = "العميل"
      this.userManagement = "ادارة المستخدمين"
      this.users = "المستخدمين"
      this.subSystem = "نظام بديل"
      this.customerManagement = "ادارة العملاء"
      this.customers = "العملاء"
      this.policies = "البوليصات"
      this.endorsements = "الضمانات"
      this.catagotries = "التصنيفات"
      this.supervisors = "المشرفون"
      this.technicians = "التقنيون"
      this.departments = "الاقسام"
      this.tickets = "التذاكر"
      
      this.lang_LS = "16002"





    }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "") {
      this.lang = "Arabic"
      this.direction = "ltr"
      this.changePassword = "Change password"
      this.logout = "Logout"
      this.change = "Change to:"
      this.subSystem = "النظام الفرعي"
      this.callCenter = "Call center"
      this.userManagement = "User management"
      this.users = "Users"
      this.customerManagement = "Customer management"
      this.customers = "Customers"
      this.Agent = "Agents"
      this.policies = "Policies"
      this.endorsements = "Endorsements"
      this.catagotries = "Catagories"
      this.supervisors = "Supervisors"
      this.technicians = "Technicians"
      this.departments = "Departments"
      this.tickets = "Tickets"
      
      
      this.lang_LS = "16001"
    }
    localStorage.setItem(this._globals.baseAppName + '_language', this.lang_LS);
    console.log("lang: ",localStorage.getItem(this._globals.baseAppName + '_language'))
  }


  onlogonav(){
    this.opened = !this.opened;
    if(window.innerWidth > 600){
      
      this.navWidth = '105px'
  }else{
      this.navWidth = '0px'
  }
  }

  onhamnav(){
    this.opened = !this.opened;
    this.open = true;
    if(window.innerWidth > 600){
      this.navWidth = '200px'
    }else{
      this.navWidth = '85%'
    }
  }


  onToggle() {
    this.break = !this.break
  }
  onChangePassword = function () {
    
    this.dialogRef = this.dialog.open(ChangePasswordNewComponent, {
      disableClose: true,
      
      data: {
        userId: this._auth.getUserId()
      }
    });
  
  this.dialogRef.afterClosed().subscribe(() => {});
};

onResize(event:any){
  this.open =
  window.innerWidth >= 600
    ? true
    : false;
    this.opened = false;

}

onCancel(id: number) {
  this.testArray[id].openNotification = false
  this.testArray[id+1].openNotification = true
}
// resizeValidate(event: ResizeEvent): boolean {
//   const MIN_DIMENSIONS_PX: number = 50;
//   if (
//     event.rectangle.width &&
//     event.rectangle.height &&
//     (event.rectangle.width < MIN_DIMENSIONS_PX ||
//       event.rectangle.height < MIN_DIMENSIONS_PX)
//   ) {
//     return false;
//   }
//   return true;
// }

//                   /**
//                    * Finilizes resize positions
//                    * (used for drawer/sidenav width)
//                    * @param event 
//                    */
// onResizeEnd(event: ResizeEvent): void {
//   this.resizeStyle = {
//                    // enable/disable these per your needs
//     // position: 'fixed',
//     // left: `${event.rectangle.left}px`,
//     // top: `${event.rectangle.top}px`,
//     // height: `${event.rectangle.height}px`,
//     width: `${event.rectangle.width}px`,
//   };
// }
 
 
}
