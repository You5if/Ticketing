import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { Sources } from 'src/app/source.model';
import { TicketEntryService } from './ticket-entry.service';
import { GlobalSerivce } from 'src/app/global-functions.service';

@Component({
  selector: 'app-ticket-entry',
  templateUrl: './ticket-entry.component.html',
  styleUrls: ['./ticket-entry.component.scss']
})

export class TicketEntryComponent implements OnInit {

	url: string;
  checkedIsSub:boolean = true;

    model: Send = {
      tableId: 97,
      recordId: 0,
      userId: +this._auth.getUserId(),
      roleId: +localStorage.getItem('role'),
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };

    last: any = {
      records: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: +this._auth.getUserId(),
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
    }
    myFormGroup: FormGroup;

    breakpoint: number;
    checked= false;
    checkedR = false;
    disabled = false;
    sources: Sources[] = [];
    res: any;
    spacepoint: any;
    spacezone: boolean;
    data: Sources[];
    ver: Sources;
    maxSize: number;
    submit: string;
    cancel: string;
  
    light: Sources[] = [];
    dark: Sources[] = [];
  
    ver2: Sources;
    ver3: Sources;
    ver4: Sources;
    obj1: Sources;
    obj2: Sources;
  
    direction: string;
  
    dropItem: Sources;
    container: any[][] =[];
  
    accountList: SelectModel[] = [];
  
    dialog_title: string = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  
    dropList: Sources[] = [];
  hideController: boolean = false;


  constructor(
	  private dapiService: TicketEntryService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _globalFun: GlobalSerivce,
      private _select: SelectService,
      private dialogRef: MatDialogRef<TicketEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send
  ) { }

  ngOnInit() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        this.submit = "Submit"
        this.cancel = "Cancel"
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.submit = "ارسال"
        this.cancel = "الغاء"
      }

      this._ui.loadingStateChanged.next(true);
      this.dapiService.Controllers(this.pModel).subscribe(res => {
        this._ui.loadingStateChanged.next(false);
        this.data = res;

        console.log(this.data);
        // this.data[1].access = "Editable"
        
        this.data[6].value = "Customer: NEW \n|Name: \n|Contact: \n|Contact2: \n|Inquiry: "
        this.data[10].value = this._auth.getUserId()
        
        for(let i=0;i<=this.data.length;i++){
          this.ver2 = this.data[i]
          if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
            if (this.ver2.type === "dropdown") {
              this.dropList.push(this.ver2);
              console.log("droplist: ",this.dropList)
            }
            this.light.push(this.ver2);
  
          }else{
            if(this.ver2) {
              this.dark.push(this.ver2);
            }
          }
        }
        this.breakpoint =
        window.innerWidth <= 960
          ? 1
          : this.data[0].maxRowSize;
  
        for(let k=0;k<=this.dropList.length;k++) {
          this.dropItem = this.dropList[k]
  
          if (this.dropItem.tableColumnId == 806) {
            this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition + this._auth.getUserId(), false).subscribe((res: SelectModel[]) => {
              this.dropList[k].myarray = res;
              this.container.push(res);
          });
      
          }else {
            this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
              this.dropList[k].myarray = res;
              this.container.push(res);
          });
      
          }
         
        }  
      })

      console.log(this.light);
      
  }

  onChangeValue(id: number, tableId:number) {
    if(tableId === 806) {
      this._ui.loadingStateChanged.next(true);
      this._select.getDropdown("undepartment.undepartmentid", "undepartment,problemCat", "deptname", "undepartment.undepartmentid=problemCat.undepartmentid and problemcatid=" + id, false).subscribe((res: SelectModel[]) => {
        this._ui.loadingStateChanged.next(false);
        console.log(res);
        
        this.data[4].value = res[0].id.toString();
        this.data[4].myarray2 = res[0].name;
        // this.container.push(res);
    });
    this._ui.loadingStateChanged.next(true);
    this._select.getDropdown("problemcatid", "problemCat", "cast(forcustomer as nvarchar)", "problemcatid=" + id, false).subscribe((res: SelectModel[]) => {
      this._ui.loadingStateChanged.next(false);
      console.log(res);
      if (res[0].name === "0") {
        this.data[1].myarray2 = true;
        this.data[2].myarray2 = true;
        this.data[6].value = ""
      }else if (res[0].name === "1") {
        this.data[1].myarray2 = false;
        this.data[2].myarray2 = false;
        if(this.checkedIsSub != false) {
        for(let i=this.light.length-1;i>=0;i--){
          
          if(this.light[i].tableColumnId == 808){
            this.light[i].value = "Customer: NEW \n|Name: \n|Contact: \n|Contact2: \n|Inquiry: "
          }
         
        }
      }else {
        for(let i=this.light.length-1;i>=0;i--){
          
          if(this.light[i].tableColumnId == 808){
            this.light[i].value = " Customer: <Code> \n|Name: <Name> \n|Contact:  \n|Contact2: \n|Policy code: <Code> \n|Inquiry:"
          }
         
        }
      }
      }
      // this.data[4].value = res[0].id.toString();
      // this.data[4].myarray2 = res[0].name;
      // this.container.push(res);
  });
    }

  }

  onCheck(tableId: number) {
    if(tableId === 816) {
      this.checkedIsSub = !this.checkedIsSub
      if(this.checkedIsSub != false) {
        for(let i=this.light.length-1;i>=0;i--){
          
          if(this.light[i].tableColumnId == 808){
            this.light[i].value = "Customer: NEW \n|Name: \n|Contact: \n|Contact2: \n|Inquiry: "
          }
         
        }
      }else {
        for(let i=this.light.length-1;i>=0;i--){
          
          if(this.light[i].tableColumnId == 808){
            this.light[i].value = " Customer: <Code> \n|Name: <Name> \n|Contact:  \n|Contact2: \n|Policy code: <Code> \n|Inquiry:"
          }
         
        }
      }
    }
  }

  onSubmit() {
    this.data.forEach((Object)=> this.light.forEach((obj)=>
    {
      if(Object.tableColumnId === obj.tableColumnId){
        Object.value = obj.value
      }
    }));
	
    for(let i=0;i<=this.data.length;i++){
      this.obj1 = this.data[i];
       if(this.obj1 ){
         this.last.records.push(this.obj1);
       }
     }

    
      this.last.records.sort(function(a, b) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });

      console.log("lastQ",this.last);
      
      this.last = this._globalFun.convertQuotation(this.last)

      console.log("lastQ",this.last);
      
          if(this.last.records[0].entryMode == "A"){
           this.last.auditColumn = this._auth.getAuditColumns();
           this._ui.loadingStateChanged.next(true);
           this.dapiService.EntryA(this.last).subscribe(nexto => {
            this._ui.loadingStateChanged.next(false);
             this.res = nexto;
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "saved succesfully");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
            this.dialogRef.close();
            }
     
           }, error => {
            this._ui.loadingStateChanged.next(false);
             console.log(error);
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "Error!!");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfo("رسالة", "توجد مشكلة");
            this.dialogRef.close();
            }
           });
         }else if(this.last.records[0].entryMode == "E"){
           this.last.auditColumn = this._auth.getAuditColumns();
           this._ui.loadingStateChanged.next(true);
           this.dapiService.EntryE(this.last).subscribe(nexto => {
            this._ui.loadingStateChanged.next(false);
             this.res = nexto;
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "saved succesfully");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
            this.dialogRef.close();
            }
     
           }, error => {
            this._ui.loadingStateChanged.next(false);
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "Error!!");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              
              this._msg.showInfo("خطأ!!", "توجد مشكلة");
            this.dialogRef.close();
            }
           });
         }
      }

  onResize(event) {
    this.spacepoint =
      event.target.innerWidth <= 960
        ? (this.spacezone = false)
        : (this.spacezone = true);
    this.breakpoint =
      event.target.innerWidth <= 960
        ? 1
        : this.data[0].maxRowSize;
  }

  onCancel() {
    this.dialogRef.close();
  }
}

