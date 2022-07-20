import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppGlobals } from 'src/app/app.global';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { AddCommentComponent } from '../comment-opt/checkfordelete.component';
import { TicketAttachModel, TicketCommentModel, TicketModel } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { FileListModel } from '../upload/upload-file.model';

import {  CommentService } from './checkfordelete.service';





@Component({
  selector: 'app-checkfordelete',
  templateUrl: './checkfordelete.component.html',
  styleUrls: ['./checkfordelete.component.scss']
})
export class DetailsEntryComponent implements OnInit {

  
  showDetailsAll: boolean = true;
  showDetailsAll2: boolean = false;
  showDetails: boolean = false;
  showDetails2: boolean = false;
  comments: any[]
   submit: string;
    cancel: string;
    direction:string;
    dialog_title:string;
    lFiles: FileListModel[] = [];
    detActionsStatus: number = +localStorage.getItem("detActions")
  constructor(
    public dialogRef: MatDialogRef<DetailsEntryComponent>,
    private _globals: AppGlobals,
    private _auth: AuthService,
    public dialog12: MatDialog,
    private ticketservice: TicketService,
    private _msg: MessageBoxService,
    private _ui: UIService,
    private dapiService: CommentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
      ) { }

  ngOnInit() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.submit = "Submit"
      this.cancel = "Cancel"
      this.dialog_title = "Ticket details"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.dialog_title = "تفاصيل التذكرة"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }

    this.refreshMe()
    
  }

  refreshMe() {
    this.showDetails = this.data.showDetails
    this.showDetails2 = this.data.showDetails2
    this.showDetailsAll = this.data.showDetailsAll
    this.showDetailsAll2 = this.data.showDetailsAll2
    this.detActionsStatus = +localStorage.getItem("detActions")
    this._ui.loadingStateChanged.next(true);
         this.ticketservice.getComments(this.data.tickectDetails.ticketId).subscribe((response) => {
           console.log(response);
           
           this._ui.loadingStateChanged.next(false);
           this.comments = response
           this.comments.forEach((com) => {
             com.crDate = com.crDate.replace('T', ' ')
             if (com.commentType === "ATTACH") {
               com.apiImagePath = "http://ticketingapi.autopay-mcs.com/" + com.apiImagePath
             }
           })
           // console.log(this.comments);
           
           // this.comments.forEach((com) => {
           //   com.edit = false
           // })
         })
  }

  public uploadFinished = (event) => { // this is event being called when file gets uploaded
    
    const file: FileListModel = {
        originalFileName: event.originalFileName,
        fileName: event.fileName,
        extention: event.extention,
        fullPath: event.fullPath,
        apiPath: event.apiPath,
        apiImagePath: event.apiPath
    };
    this.lFiles.push(file); 
    var newAttach: TicketAttachModel = {
      ticketAttachId: 0,
      ticketId: this.data.tickectDetails.ticketId,
      appUserId: this._auth.getUserId(),
      aPIImagePath: file.apiImagePath,
      fileName: file.fileName,
      extension: file.extention,
      fullPath: file.fullPath,
      aPIPath: file.apiPath,
      originalFileName: file.originalFileName,
      active: true,
      entryMode: 'A',
      readOnly: true,
      auditColumns: {
       approvalStatusId: 1100001,
       companyId: 10001,
       branchId: 201,
       financialYearId: 1,
       userId: this._auth.getUserId(),
       mACAddress: "unidentified",
       hostName: "unidentified",
       iPAddress: "unidentified",
       deviceType: "Win32"
     },
     }

     console.log(JSON.stringify(newAttach));
     
     
     this.ticketservice.CreateAttach(newAttach).subscribe((response) => {
      console.log(response);
      this.refreshMe()
      // if(this.showDetailsAll === false) {
      //   this.openTicketDet2(this.dat.tickectDetails, +localStorage.getItem("detActions") )
      // }else {
      //   this.openTicketDet(this.tickectDetails, +localStorage.getItem("detActions") )
      // }
    })
    
    
    // this.imagePathUrl2 = this.imgHttp.concat(file.fullPath.substring(file.fullPath.indexOf('h') + 1))
    // console.log(this.imagePathUrl2);
    
    // this.showit = true
    // and it pushes the files to this array also, then why doesnt it show?
    // this.data = this.lFiles;
    // this.validatedisabled = false
    // this.validatedisabledmethod();
    // bro problem is not this component, it somehow is not reflecting in other two... the files which i brought here..
    // yea i was just making sure they were leaving here correctly.. now i will go to step 2, sorry ok
}

  onNewComment() {
    this.openCommentDialog(this.data.tickectDetails)
  }
  
  openCommentDialog = function(result: TicketModel) {
    if (result === undefined) {
      this.dialogRef12 = this.dialog12.open(AddCommentComponent, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef12 = this.dialog12.open(AddCommentComponent, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef12.afterClosed().subscribe(() => {
      this.detActionsStatus = +localStorage.getItem("detActions")
      // if(this.showDetailsAll === false) {
      //   this.openTicketDet2(this.tickectDetails, +localStorage.getItem("detActions") )
      // }else {
      //   this.openTicketDet(this.tickectDetails, +localStorage.getItem("detActions") )
      // }
      this.refreshMe()

      console.log(this.detActionsStatus);
      
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit(): void{
    
    
      
  }

}
