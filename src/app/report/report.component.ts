import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';
import { SelectService } from '../components/common/select.service';
import { ReportPageService } from '../components/PR/report-page/report-page.service';
import { Router } from '@angular/router';
import { AppGlobals } from '../app.global';
import { SelectModel } from '../components/misc/SelectModel';
import { AuthService } from '../components/security/auth/auth.service';
import { UIService } from '../components/shared/uiservices/UI.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  myForm: FormGroup;
  technicians: any;
  allUsers: any;
  role: string = localStorage.getItem('role');
  direction: string;
  submit: string;
  techniciansL: string;
  users: string;
  toDate: string;
  fromDate: string;
  fromDateTech:string = ''
  toDateTech:string = ''
  fromDateUsers:string = ''
  toDateUsers:string = ''
  techId:number
  usersId:number
  admin: string

  constructor(
    public dialogRef: MatDialogRef<ReportComponent>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private _select: SelectService,
    private _report: ReportPageService,
    private _auth: AuthService,
    private _ui: UIService,
    private _globals: AppGlobals,
    private router: Router,
    ) { 
    this.dialogRef.disableClose = true
  }

  ngOnInit() {
    this.admin = this._auth.getUserId()
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.submit = "Get report"
      this.fromDate = "From date"
      this.toDate = "To date"
      this.techniciansL = "Technicians"
      this.users = "Users"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.submit = "التقرير"
      this.fromDate = "من تاريخ"
      this.toDate = "الى تاريخ"
      this.techniciansL = "التقنيون"
      this.users = "المستخدمين"
      
    }

    console.log("user:", this._auth.getUserId(), this._auth.getUniqueName());
    
    this._ui.loadingStateChanged.next(true);
    this._select.getDropdown('distinct probtech.appuserid','probtech,appuser',' AppUserName',' probtech.active=1 and probtech.deleted=0 and Probtech.AppUserId=AppUser.AppUserId and ProblemCatId in (select ProblemCatId from ProbSup where active=1 and deleted=0 and appuserid='+this._auth.getUserId()+')',false).subscribe((res: SelectModel[]) => {
      this._ui.loadingStateChanged.next(false);
      this.technicians = res;
      this.technicians.push({id: this._auth.getUserId(), name: this._auth.getUniqueName()})
  });
    this._ui.loadingStateChanged.next(true);
    this._select.getDropdown('appuserid','appuser',' AppUserName',' active=1 and deleted=0 and appuserid>1',false).subscribe((res: SelectModel[]) => {
      this._ui.loadingStateChanged.next(false);
      this.allUsers = res;
      // this.technicians.push({id: this._auth.getUserId(), name: this._auth.getUniqueName()})
  });

    

    

    
  }

  onClose() {
    this.dialogRef.close()
  }

  onReport(fromDate, toDate, id) {
    if(id > 0) {
      let reportId: number = 2;
      let restOfUrl: string;
      restOfUrl = 'from=' + fromDate + "&to=" + toDate + "&user=" + id;
      this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      this.router.navigate(['System/TechnicianReport']);
      // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
      // window.open('#/report', '_blank');
      console.log(restOfUrl)
    }
  }

  onFromDateTech(e:any) {
    let idD = (<HTMLInputElement>e.target).value
    this.fromDateTech = idD
    if (this.toDateTech === "") {
      this.toDateTech = idD
    }
    // console.log("fromDate", this.fromDateTech);
    
  }
  onToDateTech(e:any) {
    let idD2 = (<HTMLInputElement>e.target).value
    this.toDateTech = idD2
    if (this.fromDateTech === "") {
      this.fromDateTech = idD2
    }
    // console.log("toDate", this.toDateTech);
    
  }
  onFromDateUsers(e:any) {
    let idD3 = (<HTMLInputElement>e.target).value
    this.fromDateUsers = idD3
    if (this.toDateUsers === "") {
      this.toDateUsers = idD3
    }
    // console.log("fromDate", this.fromDateTech);
    
  }
  onToDateUsers(e:any) {
    let idD4 = (<HTMLInputElement>e.target).value
    this.toDateUsers= idD4
    if (this.fromDateUsers === "") {
      this.fromDateUsers = idD4
    }
    // console.log("toDate", this.toDateTech);
    
  }
  

  onSubmit(type: string) {
    if(type === 'tech') {
      this.onReport(
        this.fromDateTech,
        this.toDateTech,
        this.techId
      );
    }else if(type === 'user') {
      this.onReport(
        this.fromDateUsers,
        this.toDateUsers,
        this.usersId
      );
    }
  }
}
