import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ClientUserEntryComponent } from './clientuser-entry/clientuser-entry.component';
import { ClientUserModel } from './clientuser.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { ClientUserService } from './clientuser.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { SelectionModel } from '@angular/cdk/collections';
import { Send } from 'src/app/send.model';
import { CheckfordeleteComponent, DeleteModel } from '../operation/checkfordelete/checkfordelete.component';
import { ChangePasswordNewComponent } from '../change-password/change-password.component';

@Component({
    selector: 'app-clientuser',
    templateUrl: './clientuser.component.html',
    styleUrls: ['./clientuser.component.scss']
  })

export class ClientUserComponent implements OnInit {

    displayedColumns: string[] =
        ['displayName', 'username', 'appRole', 'password', 'changePassword'];

    dataSource: any;
    model: Send;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    clickedRows = new Set<ClientUserModel>();
    selection = new SelectionModel<ClientUserModel>(true, []);delete: string;
;
    menuId: number;
    displayName: string;
    username: string;
    appRole: string;
    customerName: string;
    password: string;
    edit: string;
  header: string;
  changePassword: string;
  bankName:string;
  submit: string;
  cancel: string;
  direction: string;
  indexes: any;
  deleteModel: DeleteModel;
  opC: boolean = true;

    totalRecords: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];

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
        private _msg: MessageBoxService,
        private _globals: AppGlobals,
        private _auth: AuthService,
        private _select: SelectService,
        private clientuserservice: ClientUserService
      ) {
        this.pTableName = 'ClientUser';
        this.pScreenId = 104;
        this.pTableId = 104;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
      this.refreshMe();
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Users"
      this.displayName = "User"
      this.username = "Username"
      this.appRole = "Role"
      this.customerName = "Customer"
      this.password = "Password"
      this.delete = "Delete"
      this.changePassword = "Change password"
      // this.accountCode = "Account Code"
      // this.accountName = "Account Name"
      // this.accountType = "Account Type"
      
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "المستخدمين"
      this.displayName = "المستخدم"
      this.changePassword = "تغيير كلمة السر"
      this.username = "اسم المستخدم"
      this.appRole = "الدور"
      this.customerName = "العميل"
      this.password = "كلمة المرور"
      this.delete = "حذف"
      // this.accountCode = "رمز الحساب"
      // this.accountName = "اسم الحساب"
      // this.accountType = "نوع الحساب"
     
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    this._cf.getPageData('ClientUser', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result
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

  onChangePassword = function (id:number) {
    
    this.dialogRef = this.dialog.open(ChangePasswordNewComponent, {
      disableClose: true,
      
      data: {
        userId: id
      }
    });
  
  this.dialogRef.afterClosed().subscribe(() => {});
};

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    try {
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
          (result: ClientUserModel) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
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

  onDelete(idAC:number) { 
    
    this.opC = false
    this.deleteModel = {
      name: this.pTableName,
      id: idAC
    }
    this.openConfirmDialog(this.deleteModel)
    // this._ui.loadingStateChanged.next(true);
    // this.invoiceservice.getDelete(id).subscribe((result) => {
    //   this._ui.loadingStateChanged.next(false);
    //   this.refreshMe();
    // })
  }

  onSort = function () {
    this.dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd = function () {
    this.model = {
      tableId: 104,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add user");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة مستخدم");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.clientuserservice.getClientUserEntry(id).subscribe((result: ClientUserModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    if(this.opC == true) {
      this.model = {
        tableId: 104,
        recordId: id,
        userId: 26,
        roleId: 2,
        languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
      };
      if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit user");
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل مستخدم");
      }
      
      this.openEntry2(this.model)
    }
    
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        (this.selection.clear() ,this.clickedRows.clear()):
        (this.selection.clear(), this.dataSource.data.forEach(row => {this.selection.select(row); if (!this.clickedRows.has(row)) {

          this.clickedRows.add(row)
        }}))
  }

  onId(id: number, row:ClientUserModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }
  openEntry = function (result: ClientUserModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(ClientUserEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(ClientUserEntryComponent, {
        disableClose: false,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  openEntry2 = function (result: Send) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(ClientUserEntryComponent, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(ClientUserEntryComponent, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  openConfirmDialog = function(result: DeleteModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(CheckfordeleteComponent, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(CheckfordeleteComponent, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  }


}
