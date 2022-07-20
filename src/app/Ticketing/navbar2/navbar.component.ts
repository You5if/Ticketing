import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { RouterLinkActive } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';

import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { Send } from 'src/app/send.model';
import { AppNotificationEntryService } from '../appnotification/appnotification-entry/appnotification-entry.service';
import { ChangePasswordNewComponent } from '../change-password/change-password.component';
import { NavbarService } from './navbar.service';

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
  pageData :any
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
  hideNotification: boolean = true;
  notSound: number = 0

  nlast: any = {
    records: [],
    auditColumn: this._auth.getAuditColumns()
  }
  model: Send = {
    tableId: 106,
    recordId: 0,
    userId: +this._auth.getUserId(),
    roleId: +localStorage.getItem('role'),
    languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  };
  

  testArray = [
    { id: 1, message: "First notification", openNotification: true},
    { id: 2, message: "Second notification", openNotification: false},
    { id: 3, message: "Third notification", openNotification: false}
  ]

  

  lang_LS: string;
  changePassword: string;
  newNotification: any;
  reports: string;
  report: string;
  constructor(
    private _auth: AuthService,
    private titleService: Title,
    private navService: AppNotificationEntryService,
    private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
    private _globals: AppGlobals,
    public dialog: MatDialog,) { }

  ngOnInit() {
    this.pageData = {
      tableId: 106,
      userId: 26,
      recordsPerPage: 100,
      pageNo: 1,
      sort: 'notTime desc',
      filter: "appUserId=("+ this._auth.getUserId()+")"
    }
    
    this._cf.newGetPageData("AppNotification", this.pageData).subscribe((result) => {
      
      this.newNotification = result
      if (!this.newNotification[0].isRead) {
        this.hideNotification = false
        if (this.newNotification[0].appNotificationId != this.notSound) {
          this.notSound = this.newNotification[0].appNotificationId
          this.playSound('../../../assets/notification-pretty-good.mp3')
        }
      }
      // if (this.newNotification[0].appNotificationId != +localStorage.getItem(this._globals.baseAppName + '_notificationBadgeId')) {
      //   localStorage.setItem(this._globals.baseAppName + '_notificationBadgeId', this.newNotification[0].appNotificationId.toString())
      //   this.hideNotification = false
      //   this.playSound('../../../assets/notification-pretty-good.mp3')
      // }else {
      //   this.hideNotification = true
      // }
      
          console.log(result)
    })
    
    this.startTimer()
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
      this.reports = "Reports"
      this.report = "Report"
      
      this.changePassword = "Change password"
      this.nameTitle = localStorage.getItem(this._globals.baseAppName + '_title')

      this.open =
  window.innerWidth >= 600
    ? true
    : false;
      this.opened =
  window.innerWidth >= 600
    ? true
    : false;
    // this.opened = false;
  }

  playSound(url) {
    const audio = new Audio(url);
    audio.play();
  }

  startTimer() {
    setInterval(() => {
      this._cf.newGetPageData("AppNotification", this.pageData).subscribe((result) => {
      
        this.newNotification = result
        if (!this.newNotification[0].isRead) {
          this.hideNotification = false
          if (this.newNotification[0].appNotificationId != this.notSound) {
            this.notSound = this.newNotification[0].appNotificationId
            this.playSound('../../../assets/notification-pretty-good.mp3')
          }
        }
        
            console.log(result)
      })
      // this._cf.newGetPageData("AppNotification", this.pageData).subscribe((result) => {
      
      //   this.newNotification = result
      //   if (this.newNotification[0].appNotificationId != +localStorage.getItem(this._globals.baseAppName + '_notificationBadgeId')) {
      //     localStorage.setItem(this._globals.baseAppName + '_notificationBadgeId', this.newNotification[0].appNotificationId.toString())
      //     this.hideNotification = false
      //     this.playSound('../../../assets/notification-pretty-good.mp3')
      //   }
        
      //       console.log(result)
      // })
    },5000)
  }
  // startTimer() {
  //   setInterval(() => {
  //     var notify = this.testArray.find(o => o.openNotification === true)
  //     this.onCancel2(notify.id)
  //   },5000)
  // }

  onNotification() {
    this.hideNotification = true
    for (let i = 0; i < this.newNotification.length; i++) {
      if (!this.newNotification[i].isRead) {
        this.model.recordId = this.newNotification[i].appNotificationId
        console.log("modelUN", JSON.stringify(this.model));
        
        this.navService.Controllers(this.model).subscribe(res => {
            this.nlast.records = res
            this.nlast.records[5].value = "1"
            console.log("editUN", JSON.stringify(this.nlast));
            
        this.navService.EntryE(this.nlast).subscribe(next => {
          this.nlast.records = []
          this.hideNotification = true
        }, error => {
          this.nlast.records = []
          this.hideNotification = true
        })
        })
        
        
      }
      
    }
  }

  onCancel2(id: number) {
    for (let i = 0; i < this.testArray.length; i++) {
      if (this.testArray[i].id === id) {
        this.testArray[i].openNotification = false
    this.testArray[i+1].openNotification = true
    if (this.testArray[i+1].openNotification) {
      this.playSound('../../../assets/notification-pretty-good.mp3')
    }
      }
      
    }
    
  }
  onCancel(id: number) {
    this.testArray[id].openNotification = false
    this.testArray[id+1].openNotification = true
    if (this.testArray[id+1].openNotification) {
      this.playSound('../../../assets/notification-pretty-good.mp3')
    }
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
      this.reports = "Reports"
      this.report = "Report"
      
      
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
      this.reports = "Reports"
      this.report = "Report"
      
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
      this.reports = "Reports"
      this.report = "Report"
      
      
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
    // this.opened = false;
    // this.open = false

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
