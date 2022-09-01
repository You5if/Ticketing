import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertifyService } from 'src/app/alertify.service';
import { AppGlobals } from 'src/app/app.global';
import { SelectService } from 'src/app/components/common/select.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { TicketCommentModel, TicketModel } from '../ticket.model';

import {  CommentService } from './checkfordelete.service';





@Component({
  selector: 'app-checkfordelete',
  templateUrl: './checkfordelete.component.html',
  styleUrls: ['./checkfordelete.component.scss']
})
export class AdminAssignedComponent implements OnInit {

  newComment: TicketCommentModel = {
    ticketCommentId: 0,
    ticketId: this.data.ticketId,
    appUserId: +this._auth.getUserId(),
    commentDate: null,
    comment: '',
    active: true,
    entryMode: 'A',
    readOnly: true,
      auditColumns: {
       approvalStatusId: 1100001,
       companyId: 10001,
       branchId: 201,
       financialYearId: 1,
       userId: +this._auth.getUserId(),
       mACAddress: "unidentified",
       hostName: "unidentified",
       iPAddress: "unidentified",
       deviceType: "Win32"
     },


   }

   users: SelectModel[]
   appUserId: number
   tech: string;

   submit: string;
    cancel: string;
    direction:string;
    dialog_title:string;
  note: string;
  showNote: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AdminAssignedComponent>,
    private _globals: AppGlobals,
    private _auth: AuthService,
    private alertify: AlertifyService,
    private _select: SelectService,
    private _msg: MessageBoxService,
    private _ui: UIService,
    private dapiService: CommentService,
    @Inject(MAT_DIALOG_DATA) public data: TicketModel,
      ) { }

  ngOnInit() {
    console.log(this.data);
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.submit = "Submit"
      this.cancel = "Cancel"
      this.tech = "Technician"
      this.dialog_title = "Assign to"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.dialog_title = "تعيين الى"
      this.tech = "التقنيون"    
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    //http://ticketingapi.autopay-mcs.com/api/Ddl/getdropdown/distinct%20probtech.appuserid/probtech,appuser/AppUserName/%20probtech.active=1%20and%20probtech.deleted=0%20and%20Probtech.AppUserId=AppUser.AppUserId%20and%20ProblemCatId%20in%20(select%20ProblemCatId%20from%20ProbSup%20where%20active=1%20and%20deleted=0%20and%20appuserid=26)/false
    this._select.getDropdown('distinct probtech.appuserid','probtech,appuser',' AppUserName',' probtech.active=1 and probtech.deleted=0 and Probtech.AppUserId=AppUser.AppUserId and ProblemCatId in (select ProblemCatId from ProbSup where active=1 and deleted=0 and appuserid='+this._auth.getUserId()+')',false).subscribe((res: SelectModel[]) => {
      this.users = res;
  });
  console.log(this.data);
  }

  onChoosingTech(id: number) {
    this.showNote = true
    this._select.getDropdown('cast(count(ticketid) as bigint)','ticket',"'ok'",'active=1 and deleted=0 and status=37002 and appuserid='+id,false).subscribe((res: SelectModel[]) => {
      this.note = "Current load:" + " " +res[0].id + " " + "tickets"
  });
  }
  

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit(): void{
    console.log(this.appUserId);
    
   
  
  // this._ui.loadingStateChanged.next(true);
  
  this.dapiService.AssignTicket(+this._auth.getUserId(), this.appUserId, this.data.ticketId).subscribe((response) => {
    

    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.alertify.success( "Assigned");
    this.dialogRef.close();
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.alertify.success("تم التعيين");
    this.dialogRef.close();
    }
    

   }, error => {
     console.log(error);
    //  if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
    //   this.alertify.error("Error!!");
    // this.dialogRef.close();
    // }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
    //   this.alertify.error("!!خطأ");
    // this.dialogRef.close();
    // }
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.alertify.success( "Assigned");
    this.dialogRef.close();
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.alertify.success("تم التعيين");
    this.dialogRef.close();
    }
   });
    
      
  }

}
