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

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  myForm: FormGroup;
  technicians: any;
  role: string = localStorage.getItem('role');
  direction: string;
  submit: string;
  techniciansL: string;
  toDate: string;
  fromDate: string;
  fromDateTech:string = ''
  toDateTech:string = ''
  techId:number

  constructor(
    public dialogRef: MatDialogRef<ReportComponent>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private _select: SelectService,
    private _report: ReportPageService,
    private _auth: AuthService,
    private _globals: AppGlobals,
    private router: Router,
    ) { 
    this.dialogRef.disableClose = true
  }

  ngOnInit() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.submit = "Get report"
      this.fromDate = "From date"
      this.toDate = "To date"
      this.techniciansL = "Technicians"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.submit = "التقرير"
      this.fromDate = "من تاريخ"
      this.toDate = "الى تاريخ"
      this.techniciansL = "التقنيون"
      
    }

    console.log("user:", this._auth.getUserId(), this._auth.getUniqueName());
    

    this._select.getDropdown('distinct probtech.appuserid','probtech,appuser',' AppUserName',' probtech.active=1 and probtech.deleted=0 and Probtech.AppUserId=AppUser.AppUserId and ProblemCatId in (select ProblemCatId from ProbSup where active=1 and deleted=0 and appuserid='+this._auth.getUserId()+')',false).subscribe((res: SelectModel[]) => {
      this.technicians = res;
      this.technicians.push({id: this._auth.getUserId(), name: this._auth.getUniqueName()})
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
    console.log("fromDate", this.fromDateTech);
    
  }
  onToDateTech(e:any) {
    let idD2 = (<HTMLInputElement>e.target).value
    this.toDateTech = idD2
    if (this.fromDateTech === "") {
      this.fromDateTech = idD2
    }
    console.log("toDate", this.toDateTech);
    
  }
  

  onSubmit() {
    
    
    this.onReport(
      this.fromDateTech,
      this.toDateTech,
      this.techId
    );
  }
}
