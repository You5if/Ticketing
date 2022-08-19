import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppGlobals } from 'src/app/app.global';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { TicketCommentModel, TicketModel } from '../ticket.model';

import {  CommentService } from './checkfordelete.service';





@Component({
  selector: 'app-checkfordelete',
  templateUrl: './checkfordelete.component.html',
  styleUrls: ['./checkfordelete.component.scss']
})
export class AddCommentComponent implements OnInit {

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

   submit: string;
    cancel: string;
    direction:string;
    dialog_title:string;
  constructor(
    public dialogRef: MatDialogRef<AddCommentComponent>,
    private _globals: AppGlobals,
    private _auth: AuthService,
    private _msg: MessageBoxService,
    private _ui: UIService,
    private dapiService: CommentService,
    @Inject(MAT_DIALOG_DATA) public data: TicketModel,
      ) { }

  ngOnInit() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.submit = "Submit"
      this.cancel = "Cancel"
      this.dialog_title = "Add Comment"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.dialog_title = "اضف تعليق"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
  }
  

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit(): void{
    this.newComment.commentDate = new Date()
    this.newComment.commentDate = new Date(this.newComment.commentDate)
  console.log(this.newComment);  
  
  this._ui.loadingStateChanged.next(true);
  
  this.dapiService.CreateComment(this.newComment).subscribe((response) => {
    this._ui.loadingStateChanged.next(false);
    
    this.dialogRef.close();
    

   }, error => {
     console.log(error);
     if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this._msg.showInfo("Message", "Error!!");
    this.dialogRef.close();
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this._msg.showInfo("رسالة", "توجد مشكلة");
    this.dialogRef.close();
    }
   });
    
      
  }

}
