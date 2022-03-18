import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ResizeEvent } from 'angular-resizable-element';

import { AppGlobals } from 'src/app/app.global';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ChangePasswordNewComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  break: boolean = true;
  lang: string = "Arabic";
  direction: string = "ltr";
  resizeStyle: object = {};
  logout: string;
  change: string;
  showFiller = false;
  showButton: boolean = false;
  changePassword:string
  key: number;
  isOpen_YourVariable = true;
  lang_LS: string;
  constructor(
    private _auth: AuthService,
    private titleService: Title,
    private _globals: AppGlobals,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.resizeStyle = {
      "max-width": `30%`,
    };
    localStorage.setItem(this._globals.baseAppName + '_language', "16001")
    this.titleService.setTitle("Ticketing portal");
    // this.userId = this._auth.getUserName()
    this.logout = "Logout"
      this.change = "Language:"

      this.break =
    window.innerWidth <= 740
      ? false
      : true;
  }

  onSignOut() {
    this._auth.logout();
  }

  onChangeLanguage() {
    
    
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.lang = "Arabic"
      this.direction = "ltr"
      this.changePassword = "Change password"
      this.logout = "Logout"
      this.change = "Language:"
      
      
      this.lang_LS = "16001"
    }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.lang = "انجليزي"
      this.lang_LS = "16002"
      this.direction = "rtl"
      this.changePassword = "تغيير كلمة السر"
      this.logout = "تسجيل الخروج"
      this.change = "اللغة:"
      
      this.lang_LS = "16002"





    }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "") {
      this.lang = "Arabic"
      this.direction = "ltr"
      
      this.logout = "Logout"
      this.change = "Change to:"
      
      
      this.lang_LS = "16001"
    }
    localStorage.setItem(this._globals.baseAppName + '_language', this.lang_LS);
    console.log("lang: ",localStorage.getItem(this._globals.baseAppName + '_language'))
  }

  onToggle() {
    this.break = !this.break
  }
  onChangePassword = function () {
    
    this.dialogRef = this.dialog.open(ChangePasswordNewComponent, {
      disableClose: true,
      
      data: {}
    });
  
  this.dialogRef.afterClosed().subscribe(() => {});
};

onResize(event: any){
  this.break =
  window.innerWidth <= 740
    ? false
    : true;
}
resizeValidate(event: ResizeEvent): boolean {
  const MIN_DIMENSIONS_PX: number = 50;
  if (
    event.rectangle.width &&
    event.rectangle.height &&
    (event.rectangle.width < MIN_DIMENSIONS_PX ||
      event.rectangle.height < MIN_DIMENSIONS_PX)
  ) {
    return false;
  }
  return true;
}

                  /**
                   * Finilizes resize positions
                   * (used for drawer/sidenav width)
                   * @param event 
                   */
onResizeEnd(event: ResizeEvent): void {
  this.resizeStyle = {
                   // enable/disable these per your needs
    // position: 'fixed',
    // left: `${event.rectangle.left}px`,
    // top: `${event.rectangle.top}px`,
    // height: `${event.rectangle.height}px`,
    width: `${event.rectangle.width}px`,
  };
}
 
}
