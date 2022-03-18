import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AuthService } from "../components/security/auth/auth.service";
import { OverlayContainer } from "@angular/cdk/overlay";
// import { AuthService2 } from "../components/security/auth/myauth.service";
import { MatDialog } from "@angular/material";
import { MasterReportComponent } from "../master-report/master-report.component";
import { ReportComponent } from "../report/report.component";
import { FinancialReportComponent } from "../financial-report/financial-report.component";
import { Title } from "@angular/platform-browser";
import { ResizeEvent } from "angular-resizable-element";
import { AppGlobals } from "../app.global";
import { ChangePasswordNewComponent } from "../Ticketing/change-password/change-password.component";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  role = localStorage.getItem("role");
  break: boolean = true;
  lang: string = "Arabic";
  direction: string = "ltr";
  resizeStyle: object = {};
  logout: string;
  change: string;
  showFiller = false;
  showButton: boolean = false;
  key: number;
  isOpen_YourVariable = true;
  lang_LS: string;
  // role = this._auth.getRole();
  childValue: boolean = true;
  @Output() childOutput = new EventEmitter<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private financialReportDialog: MatDialog,
    private masterReportDialog: MatDialog,
    private titleService: Title,
    private _globals: AppGlobals,
    private reportDialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private _auth: AuthService,
    
    public overlayContainer: OverlayContainer
  ) {
    this.role = localStorage.getItem("role");
    // this.role = this._auth.getRole();
  }

  ngOnInit() {
    this.role = localStorage.getItem("role");
    // this._auth2.sharedMessage.subscribe(message => this.role = message);
    // console.log('Nav Role: ', this.role);
    this.resizeStyle = {
      "max-width": `30%`,
    };
    localStorage.setItem(this._globals.baseAppName + '_language', "16001")
    this.titleService.setTitle("Ticketing - Home");
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
      
      this.logout = "Logout"
      this.change = "Language:"
      
      
      this.lang_LS = "16001"
    }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.lang = "انجليزي"
      this.lang_LS = "16002"
      this.direction = "rtl"
      
      this.logout = "تسجيل الخروج"
      this.change = "اللغة:"
      






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

  changeChildValue() {
    return !this.childValue;
  }

  sendOutput() {
    if (!this.changeChildValue()) {
      this.overlayContainer.getContainerElement().classList.add("DarkTheme");
    } else {
      this.overlayContainer.getContainerElement().classList.remove("DarkTheme");
    }
    this.childValue = this.changeChildValue();
    this.childOutput.emit(this.childValue);
  }

  isLoggedIn() {
    return this._auth.loggedIn();
  }

  // onSignOut() {
  //   this._auth.logout();
  // }

  openFinancialReport() {
    const financialReportDialogRef = this.financialReportDialog.open(
      FinancialReportComponent
    );
  }

  openMasterReport() {
    const masterReportDialogRef = this.masterReportDialog.open(
      MasterReportComponent
    );
  }

  openReport() {
    const reportDialogRef = this.reportDialog.open(ReportComponent);
  }
}
