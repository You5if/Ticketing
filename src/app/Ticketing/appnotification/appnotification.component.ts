import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { AppNotificationEntryComponent } from './appnotification-entry/appnotification-entry.component';
import { AppNotificationModel } from './appnotification.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { AppNotificationService } from './appnotification.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';

@Component({
    selector: 'app-appnotification',
    templateUrl: './appnotification.component.html',
    styleUrls: ['./appnotification.component.scss']
  })

export class AppNotificationComponent implements OnInit {

    displayedColumns: string[] =
        ['notTime', 'notTitle', 'notMessage'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    notTime: string;
    notTitle: string;
    notMessage: string;

    model: Send;
    edit: string;
    endorsementCode:string
    endorsementDate:string
  header: string;
  bankName:string;
  submit: string;
  cancel: string;
  direction: string;
  indexes: any

  pageData :any


    totalRecords: number;
    pageSizeOptions: number[] = [100];

    screenRights: RightModel = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };

    constructor(
        public dialog: MatDialog,
        private _cf: CommonService,
        private _ui: UIService,
        private _globals: AppGlobals,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private appnotificationservice: AppNotificationService
      ) {
        this.pTableName = 'AppNotification';
        this.pScreenId = 106;
        this.pTableId = 106;
        this.recordsPerPage = 100;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.pageData = {
      tableId: this.pTableId,
      userId: 26,
      recordsPerPage: 100,
      pageNo: 1,
      sort: 'notTime desc',
      filter: "appUserId=("+ this._auth.getUserId()+")"
    }
    this._cf.setSort("notTime desc")
    this._cf.setFilter("appUserId=("+ this._auth.getUserId()+")")
      this.refreshMe();
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Notification"
      this.notTime = "Time"
      this.notMessage = "Message"
      this.notTitle = "Title"
      
      // this.accountCode = "Account Code"
      // this.accountName = "Account Name"
      // this.accountType = "Account Type"
      
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "الاشعارات"
      this.notTime = "الوقت"
      this.notMessage = "الرسالة"
      this.notTitle = "العنوان"
      
      // this.accountCode = "رمز الحساب"
      // this.accountName = "اسم الحساب"
      // this.accountType = "نوع الحساب"
     
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    // this._ui.loadingStateChanged.next(true);
    // this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
    //   this._ui.loadingStateChanged.next(false);
    //   this.totalRecords = result[0].totalRecords;
    //       this.recordsPerPage = this.recordsPerPage;
    //       this.dataSource = new MatTableDataSource(result);
    //       this.indexes = result
    //       console.log(result)
    // })
    this._cf.getPageData('AppNotification', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result
          console.log("Not",result);
          
        }
      );

    this._auth.getScreenRights(this.menuId).subscribe((rights: RightModel) => {
      this.screenRights = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    try {
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
          (result: AppNotificationModel) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = 100;
            this.dataSource = result;
          }, error => {
            this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
          });
    } catch (error) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort = function () {
    this.dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  // onAdd = function () {
  //   const result: AppNotificationModel = {
      
  //     'appNotificationId': 0,
  //     'templateName': '',
  //     'description': '',
  //     'auditColumns': null,
  //     'entryMode': 'A',
  //     'active': true,
  //     'readOnly': false
  //   };
  //   this.openEntry(result);
  // };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.appnotificationservice.getAppNotificationEntry(id).subscribe((result: AppNotificationModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.appnotificationservice.getAppNotificationEntry(id).subscribe((result: AppNotificationModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'E';
      result.readOnly = false;
      this.openEntry(result);
    });
  }

  onDelete = function(id: number) {
      
  };

  openEntry = function (result: AppNotificationModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(AppNotificationEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(AppNotificationEntryComponent, {
        disableClose: false,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

}
