import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { TicketEntryComponent } from './ticket-entry/ticket-entry.component';
import { TicketAttachModel, TicketCommentModel, TicketModel } from './ticket.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { TicketService } from './ticket.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { AddCommentComponent } from './comment-opt/checkfordelete.component';
import { FileListModel } from './upload/upload-file.model';
import { AlertifyService } from 'src/app/alertify.service';
import { AssignedComponent } from './assigned-opt/checkfordelete.component';
import { TransferComponent } from './transfer-opt/checkfordelete.component';
import { TicketCloseEntryComponent } from './ticketclose-entry/ticketclose-entry.component';
import { TicketVerifyEntryComponent } from './ticketverify-entry/ticketverify-entry.component';
import { GlobalSerivce } from 'src/app/global-functions.service';
import { DetailsEntryComponent } from './details-entry/checkfordelete.component';
import { MyTestAutoComponent } from '../my-test-auto/my-test-auto.component';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.scss']
  })

export class TicketComponent implements OnInit {

    displayedColumns: string[] =
        ['ticketId'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    newTicket: string;
    assignedTicket: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    model: Send;
    lFiles: FileListModel[] = [];
    detActionsStatus: number = +localStorage.getItem("detActions")
    role = localStorage.getItem("role");

    userId: number
    opC: boolean = true

    tickectDetails : TicketModel
    direction: string

    acceptBtn:string
    assignedBtn: string
    transfer: string;
    close: string;
    closed: string;
    verify: string;
    comments: any[]

    indexes: TicketModel[]
    indexesAssigned: TicketModel[]
    indexesClosed: TicketModel[]
    indexesVerify: TicketModel[]
    items: number[] = [1,2,3,4,5,]

    ticketNoCheckedA: boolean = false
    ticketNoCheckedD: boolean = false
    agentCheckedA: boolean = false
    agentCheckedD: boolean = false
    categoryCheckedA: boolean = false
    categoryCheckedD: boolean = false
    creationCheckedA: boolean = false
    creationCheckedD: boolean = false

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
  showDetailsAll: boolean = true;
  showDetailsAll2: boolean = false;
  showDetails: boolean = false;
  showDetails2: boolean = false;
  badgeAssigned:number = 0;
  badgeClosed:number = 0;
  badgeUnassigned:number = 0;
  badgeVerified:number = 0;
  ascending: string;
  descending: string;
  apply: string;
  clear: string;
  ticketNoSortString: string = "";
  agentSortString: string = "";
  categorySortString: string = "";
  creationSortString: string = "";

  ticketPageData: any = {
    AppUserId: this._auth.getUserId(), 
    TicketId:1, 
    FromDate:"",
    ToDate:"",
    Agent:1,
    Category:1,
    SortTicketId:"",
    SortDate:"",
    SortAgent:"",
    SortCategory:""
   }

   sortIsOn : boolean = false
   filterIsOn : boolean = false
   ticketNoFilter: number
  agent: string;
  agentfilterNum: number = 1;
  categoryfilterNum: number = 1;
  category: string;
  agentL: string;
  categoryL: string;
  fromDateFilter:string = ""
  toDateFilter:string = ""
  fromDate: string;
  toDate: string;
  filterInitial: string = '1'

    constructor(
        public dialog: MatDialog,
        public dialog1: MatDialog,
        public dialog2: MatDialog,
        public dialog3: MatDialog,
        public dialog4: MatDialog,
        public dialog5: MatDialog,
        public _auto: MyTestAutoComponent,
        private _cf: CommonService,
        private alertify: AlertifyService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _globals: AppGlobals,
        private _globalFun: GlobalSerivce,
        private _auth: AuthService,
        private _select: SelectService,
        private ticketservice: TicketService
      ) {
        this.pTableName = 'Ticket';
        this.pScreenId = 97;
        this.pTableId = 97;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }


  ngOnInit() {
    // console.log(this._globalFun.convertQuotation("Testing ' fun"));
    
    console.log(this.role);
    this.userId = Number(this._auth.getUserId())
    
      this.refreshMe();
  }
  

  id = "newticket"
  tabChange(ids:any){
      this.id = ids
    }

  closeDet1() {
  this.showDetailsAll = true;
  this.showDetailsAll2 = false;
  this.showDetails = false;
  this.showDetails2 = false;
  }
  closeDet2() {
    this.showDetailsAll = false;
  this.showDetailsAll2 = true;
  this.showDetails = false;
  this.showDetails2 = false;
  }
  refreshMe() {
    this.startTicketingTimer()
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.newTicket = "New"
      this.assignedTicket = "Assigned"
      this.acceptBtn = "Accept"
      this.agent = "Agent"
      this.fromDate = "From date"
      this.toDate = "To date"
      this.agentL = "Agent:"
      this.category = "Category"
      this.categoryL = "Cat. :"
      this.assignedBtn = "Assign"
      this.transfer = "Transfer"
      this.close = "Close"
      this.closed = "Closed"
      this.ascending = "Ascending"
      this.descending = "Descending"
      this.apply = "Apply"
      this.clear = "Clear"
      this.verify = "Verify"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.newTicket = "جديد"
      this.assignedTicket = "مكلفة الى"
      this.acceptBtn = "قبول"
      this.fromDate = "من تاريخ"
      this.toDate = "الى تاريخ"
      this.assignedBtn = "تعيين"
      this.agent = "العملاء"
      this.agentL = ":العملاء"
      this.category = "الفئة"
      this.categoryL = ":الفئة"
      this.apply = "تطبيق"
      this.clear = "الغاء"
      this.transfer = "نقل"
      this.close = "اغلاق"
      this.closed = "مغلقة"
      this.ascending = "تصاعدي"
      this.descending = "تنازلي"
      this.verify = "تاكيد"
      
    }
    // this._cf.getPageData('Ticket', this.pScreenId, this._auth.getUserId(), this.pTableId,
    //   this.recordsPerPage, this.currentPageIndex, false).subscribe(
    //     (result) => {
    //       this.totalRecords = result[0].totalRecords;
    //       this.recordsPerPage = this.recordsPerPage;
    //       this.dataSource = new MatTableDataSource(result);
    //       this.indexes = result
    //     }
    //   );
    console.log(localStorage.getItem('departmentId'));
    

    this._ui.loadingStateChanged.next(true);
    this.ticketservice.newTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log('Y', JSON.stringify(result));
            
            this.indexes = result
            this.badgeUnassigned = result.length
          }
        );
        this.ticketservice.assignTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log(result);
            
            this.indexesAssigned = result
            this.badgeAssigned = result.length
          }
        );
        this.ticketservice.closedTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log(result);
            
            this.indexesClosed = result
            this.badgeClosed = result.length
          }
        );
        // this.ticketservice.getVerifyTickets(+localStorage.getItem('departmentId')).subscribe(
        //   (result) => {
        //     console.log(result);
            
        //     this.indexesVerify = result
        //     this.badgeVerified = result.length
        //   }
        // );
        // this.ticketservice.badgeOfUnassignedForAll(+localStorage.getItem('departmentId')).subscribe(
        //   (result) => {
        //     console.log(result);
        //     this.badgeUnassigned = result.id
        //     // this.indexesVerify = result
        //   }
        // );
        // this.ticketservice.badgeOfAssignedForSupervisorOrManager(+localStorage.getItem('departmentId')).subscribe(
        //   (result) => {
        //     console.log(result);
        //     this.badgeAssigned = result.id
        //     // this.indexesVerify = result
        //   }
        // );
        // this.ticketservice.badgeOfClosedForAll(+localStorage.getItem('departmentId')).subscribe(
        //   (result) => {
        //     console.log(result);
        //     this.badgeClosed = result.id
        //     // this.indexesVerify = result
        //   }
        // );
        // this.ticketservice.badgeOfVerifiedForAll(+localStorage.getItem('departmentId')).subscribe(
        //   (result) => {
        //     console.log(result);
        //     this.badgeVerified = result.id
        //     // this.indexesVerify = result
        //   }
        // );
      // if (this.role == '3') {
      //   this.ticketservice.getAssignedTickets(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
            
      //       this.indexesAssigned = result
      //     }
      //   );
      //   this.ticketservice.getClosedTickets(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
            
      //       this.indexesClosed = result
      //     }
      //   );
      //   this.ticketservice.getVerifyTickets(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
            
      //       this.indexesVerify = result
      //     }
      //   );

      //   this.ticketservice.badgeOfUnassignedForAll(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeUnassigned = result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      //   this.ticketservice.badgeOfAssignedForSupervisorOrManager(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeAssigned = result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      //   this.ticketservice.badgeOfClosedForAll(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeClosed = result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      //   this.ticketservice.badgeOfVerifiedForAll(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeVerified = result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      
      // }else if (this.role == '4') {
      //   this.ticketservice.getAssignedTickets(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
            
      //       this.indexesAssigned = result
      //     }
      //   );
      //   this.ticketservice.getClosedTickets(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
            
      //       this.indexesClosed = result
      //     }
      //   );

      //   this.ticketservice.badgeOfUnassignedForAll(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeUnassigned = result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      //   this.ticketservice.badgeOfAssignedForSupervisorOrManager(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeAssigned = result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      //   this.ticketservice.badgeOfClosedForAll(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeClosed = result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      //   this.ticketservice.badgeOfVerifiedForAll(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeVerified = result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      // }else if (this.role == '5') {
      //   this.ticketservice.getAssignedTicketsForTech(+this._auth.getUserId()).subscribe(
      //     (result) => {
      //       console.log(result);
            
      //       this.indexesAssigned = result
      //     }
      //   );

      //   this.ticketservice.badgeOfUnassignedForAll(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeUnassigned= result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      //   this.ticketservice.badgeOfAssignedForTechnician(+this._auth.getUserId()).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeAssigned = result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      //   this.ticketservice.badgeOfClosedForAll(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeClosed = result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      //   this.ticketservice.badgeOfVerifiedForAll(+localStorage.getItem('departmentId')).subscribe(
      //     (result) => {
      //       console.log(result);
      //       this.badgeVerified = result.id
      //       // this.indexesVerify = result
      //     }
      //   );
      // }

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


  startTicketingTimer() {
    setInterval(() => {
      this.ticketservice.newTicketsf(this.ticketPageData).subscribe(
        (result) => {
          console.log('Y', JSON.stringify(result));
          
          if (result[0].ticketId != this.indexes[0].ticketId) {
            this.indexes = result
          this.badgeUnassigned = result.length
          }
        }
      );
      this.ticketservice.assignTicketsf(this.ticketPageData).subscribe(
        (result) => {
          console.log(result);
          
          if (result[0].ticketId != this.indexesAssigned[0].ticketId) {
            this.indexesAssigned = result
          this.badgeAssigned = result.length
          }
          
        }
      );
      this.ticketservice.closedTicketsf(this.ticketPageData).subscribe(
        (result) => {
          console.log(result);
          if (result[0].ticketId != this.indexesClosed[0].ticketId) {
            this.indexesClosed = result
            this.badgeClosed = result.length
          }
         
        }
      );
      // this.ticketservice.getVerifyTickets(+localStorage.getItem('departmentId')).subscribe(
      //   (result) => {
      //     console.log(result);
          
      //     this.indexesVerify = result
      //     this.badgeVerified = result.length
      //   }
      // );
    },5000)
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
      ticketId: this.tickectDetails.ticketId,
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
      if(this.showDetailsAll === false) {
        this.openTicketDet2(this.tickectDetails, +localStorage.getItem("detActions") )
      }else {
        this.openTicketDet(this.tickectDetails, +localStorage.getItem("detActions") )
      }
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

onResults(type:string,e:any) {
  console.log('ee',e);
  if (type === 'agent') {
    this.agentfilterNum = e
  }else if (type === 'category') {
    this.categoryfilterNum = e
  }
}

onFromDateFilter(e:any) {
  let idD = (<HTMLInputElement>e.target).value
  this.fromDateFilter = idD
  if (this.toDateFilter === "") {
    this.toDateFilter = idD
  }
  console.log("fromDate", this.fromDateFilter);
  
}
onToDateFilter(e:any) {
  let idD2 = (<HTMLInputElement>e.target).value
  this.toDateFilter = idD2
  if (this.fromDateFilter === "") {
    this.fromDateFilter = idD2
  }
  console.log("toDate", this.toDateFilter);
  
}

ticketNoSort(sortString: string) {
  
  if (sortString === 'asc') {
    if (this.ticketNoCheckedA) {
      this.ticketNoCheckedD = false
      this.agentCheckedA = false
      this.agentCheckedD = false
      this.categoryCheckedA = false
      this.categoryCheckedD = false
      this.creationCheckedA = false
      this.creationCheckedD = false
      // console.log('trueSort A');
      this.ticketNoSortString = "asc"
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
      
    }else {
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
    }
  }else if (sortString === 'desc') {
    if (this.ticketNoCheckedD) {
      this.ticketNoCheckedA = false
      this.agentCheckedA = false
      this.agentCheckedD = false
      this.categoryCheckedA = false
      this.categoryCheckedD = false
      this.creationCheckedA = false
      this.creationCheckedD = false
      // console.log('trueSort D');
      this.ticketNoSortString = "desc"
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
    }else {
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
    }
  }
    
  }
agentSort(sortString: string) {
  
  if (sortString === 'asc') {
    if (this.agentCheckedA) {
      this.agentCheckedD = false
      this.ticketNoCheckedA = false
      this.ticketNoCheckedD = false
      this.categoryCheckedA = false
      this.categoryCheckedD = false
      this.creationCheckedA = false
      this.creationCheckedD = false
      // console.log('trueSort A');
      this.agentSortString = "asc"
      this.ticketNoSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
      
    }else {
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
    }
  }else if (sortString === 'desc') {
    if (this.agentCheckedD) {
      this.agentCheckedA = false
      this.ticketNoCheckedA = false
      this.ticketNoCheckedD = false
      this.categoryCheckedA = false
      this.categoryCheckedD = false
      this.creationCheckedA = false
      this.creationCheckedD = false
      // console.log('trueSort D');
      this.agentSortString = "desc"
      this.ticketNoSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
    }else {
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
    }
  }
    
  }
categorySort(sortString: string) {
  
  if (sortString === 'asc') {
    if (this.categoryCheckedA) {
      this.categoryCheckedD = false
      this.ticketNoCheckedA = false
      this.ticketNoCheckedD = false
      this.agentCheckedA = false
      this.agentCheckedD = false
      this.creationCheckedA = false
      this.creationCheckedD = false
      // console.log('trueSort A');
      this.categorySortString = "asc"
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.creationSortString = ""
      
    }else {
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
    }
  }else if (sortString === 'desc') {
    if (this.categoryCheckedD) {
      this.categoryCheckedA = false
      this.ticketNoCheckedA = false
      this.ticketNoCheckedD = false
      this.agentCheckedA = false
      this.agentCheckedD = false
      this.creationCheckedA = false
      this.creationCheckedD = false
      // console.log('trueSort D');
      this.categorySortString = "desc"
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.creationSortString = ""
    }else {
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
    }
  }
    
  }
creationSort(sortString: string) {
  
  if (sortString === 'asc') {
    if (this.creationCheckedA) {
      this.creationCheckedD = false
      this.ticketNoCheckedA = false
      this.ticketNoCheckedD = false
      this.agentCheckedA = false
      this.agentCheckedD = false
      this.categoryCheckedA = false
      this.categoryCheckedD = false
      // console.log('trueSort A');
      this.creationSortString = "asc"
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
      
    }else {
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
    }
  }else if (sortString === 'desc') {
    if (this.creationCheckedD) {
      this.creationCheckedA = false
      this.ticketNoCheckedA = false
      this.ticketNoCheckedD = false
      this.agentCheckedA = false
      this.agentCheckedD = false
      this.categoryCheckedA = false
      this.categoryCheckedD = false
      // console.log('trueSort D');
      this.creationSortString = "desc"
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
    }else {
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
    }
  }
    
  }

  onApplySort() {
    this.closeDet1()
    this.closeDet2()
    this.sortIsOn = true
    this.ticketPageData.SortTicketId = this.ticketNoSortString
    this.ticketPageData.SortAgent = this.agentSortString
    this.ticketPageData.SortCategory = this.categorySortString
    this.ticketPageData.SortDate = this.creationSortString

    if (this.ticketNoFilter === null) {
      this.ticketPageData.TicketId = 1
    }else if (this.ticketNoFilter === undefined) {
      this.ticketPageData.TicketId = 1
    }else {
      this.ticketPageData.TicketId = this.ticketNoFilter
    }
    
    this.ticketPageData.Agent = this.agentfilterNum
    this.ticketPageData.Category = this.categoryfilterNum
    this.ticketPageData.FromDate = this.fromDateFilter
    this.ticketPageData.ToDate = this.toDateFilter

    console.log("onApply",this.ticketPageData);
    this._ui.loadingStateChanged.next(true);
    this.ticketservice.newTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log('Y', JSON.stringify(result));
            
            this.indexes = result
            this.badgeUnassigned = result.length
          }
        );
        this.ticketservice.assignTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log(result);
            
            this.indexesAssigned = result
            this.badgeAssigned = result.length
          }
        );
        this.ticketservice.closedTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log(result);
            
            this.indexesClosed = result
            this.badgeClosed = result.length
          }
        );
    
  }
  onApplyFilter() {
    this.closeDet1()
    this.closeDet2()
    this.filterIsOn = true
    this.ticketPageData.SortTicketId = this.ticketNoSortString
    this.ticketPageData.SortAgent = this.agentSortString
    this.ticketPageData.SortCategory = this.categorySortString
    this.ticketPageData.SortDate = this.creationSortString

    this.filterInitial = "1"

    if (this.ticketNoFilter === null) {
      this.ticketPageData.TicketId = 1
    }else if (this.ticketNoFilter === undefined) {
      this.ticketPageData.TicketId = 1
    }else {
      this.ticketPageData.TicketId = this.ticketNoFilter
    }
    this.ticketPageData.Agent = this.agentfilterNum
    this.ticketPageData.Category = this.categoryfilterNum
    this.ticketPageData.FromDate = this.fromDateFilter
    this.ticketPageData.ToDate = this.toDateFilter

    console.log("onApply",this.ticketPageData);
    this._ui.loadingStateChanged.next(true);
    this.ticketservice.newTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log('Y', JSON.stringify(result));
            
            this.indexes = result
            this.badgeUnassigned = result.length
          }
        );
        this.ticketservice.assignTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log(result);
            
            this.indexesAssigned = result
            this.badgeAssigned = result.length
          }
        );
        this.ticketservice.closedTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log(result);
            
            this.indexesClosed = result
            this.badgeClosed = result.length
          }
        );
    
  }

  onClickSort() {
    if (!this.sortIsOn) {
      this.creationCheckedA = false
      this.ticketNoCheckedA = false
      this.ticketNoCheckedD = false
      this.agentCheckedA = false
      this.agentCheckedD = false
      this.categoryCheckedA = false
      this.categoryCheckedD = false
      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""
    }
  }
  onClickFilter() {
    if (!this.filterIsOn) {
      this.ticketNoFilter = null
      this.filterInitial = "resetCC"
    this.agentfilterNum = 1
    this.categoryfilterNum = 1
    this.fromDateFilter = ""
    this.toDateFilter = ""
    }
  }

  onClearSort() {
    this.closeDet1()
    this.closeDet2()
    this.sortIsOn = false
      this.ticketNoCheckedA = false
      this.ticketNoCheckedD = false
      this.agentCheckedA = false
      this.agentCheckedD = false
      this.categoryCheckedA = false
      this.categoryCheckedD = false
      this.creationCheckedA = false
      this.creationCheckedD = false

      this.ticketNoSortString = ""
      this.agentSortString = ""
      this.categorySortString = ""
      this.creationSortString = ""


    this.ticketPageData = {
      AppUserId: this._auth.getUserId(), 
      TicketId: this.ticketNoFilter, 
      FromDate: this.fromDateFilter,
      ToDate: this.toDateFilter,
      Agent: this.agentfilterNum,
      Category: this.categoryfilterNum,
      SortTicketId:"",
      SortDate:"",
      SortAgent:"",
      SortCategory:""
     }

     if (this.ticketNoFilter === null) {
      this.ticketPageData.TicketId = 1
    }else if (this.ticketNoFilter === undefined) {
      this.ticketPageData.TicketId = 1
    }else {
      this.ticketPageData.TicketId = this.ticketNoFilter
    }

     console.log("onClearSort", this.ticketPageData);
     this._ui.loadingStateChanged.next(true);
    this.ticketservice.newTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log('Y', JSON.stringify(result));
            
            this.indexes = result
            this.badgeUnassigned = result.length
          }
        );
        this.ticketservice.assignTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log(result);
            
            this.indexesAssigned = result
            this.badgeAssigned = result.length
          }
        );
        this.ticketservice.closedTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log(result);
            
            this.indexesClosed = result
            this.badgeClosed = result.length
          }
        );
     
  }
  onClearFilter() {
    this.closeDet1()
    this.closeDet2()
    this.filterIsOn = false
    this.ticketNoFilter = null
    this.agentfilterNum = 1
    this.categoryfilterNum = 1
    this.fromDateFilter = ""
    this.toDateFilter = ""
    this.filterInitial = "resetC"

    // console.log("dd", this._auto.myControl);
    
    

    this.ticketPageData = {
      AppUserId: this._auth.getUserId(), 
      TicketId:1, 
      FromDate:"",
      ToDate:"",
      Agent:1,
      Category:1,
      SortTicketId: this.ticketNoSortString,
      SortDate: this.creationSortString,
      SortAgent: this.agentSortString,
      SortCategory: this.categorySortString
     }
     console.log("onClearFilter", this.ticketPageData);
     this._ui.loadingStateChanged.next(true);
    this.ticketservice.newTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log('Y', JSON.stringify(result));
            
            this.indexes = result
            this.badgeUnassigned = result.length
          }
        );
        this.ticketservice.assignTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log(result);
            
            this.indexesAssigned = result
            this.badgeAssigned = result.length
          }
        );
        this.ticketservice.closedTicketsf(this.ticketPageData).subscribe(
          (result) => {
            this._ui.loadingStateChanged.next(false);
            console.log(result);
            
            this.indexesClosed = result
            this.badgeClosed = result.length
          }
        );
     
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    try {
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
          (result: TicketModel) => {
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
  

  onAcceptBtn(id: number) {
    this.opC = false
    this.ticketservice.acceptBtn(+this._auth.getUserId(), id).subscribe((response) => {
      this.refreshMe()
      this.alertify.success('Ticket is accepted')
      
    })
  }
  onVert(id: number) {
    this.opC = false
    
  }
  onTransferBtn(ticket: TicketModel) {
    this.opC = false
    this.openTransferDialog(ticket)
  }

  onAssignedBtn(ticket: TicketModel) {
    this.opC = false
    this.openAssignedDialog(ticket)
  }
  onVerifyBtn(ticket: TicketModel) {
    this.opC = false
    this.model = {
      tableId: 100,
      recordId: 0,
      userId: +this._auth.getUserId(),
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة");
    }
    
    this.openEntry4(this.model, ticket);
  }
  onCloseBtn(ticket: TicketModel) {
    this.opC = false
    this.model = {
      tableId: 99,
      recordId: 0,
      userId: +this._auth.getUserId(),
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة");
    }
    
    this.openEntry3(this.model, ticket);
  }

  onSort = function () {
    this.dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd = function () {
    this.model = {
      tableId: 97,
      recordId: 0,
      userId: +this._auth.getUserId(),
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.ticketservice.getTicketEntry(id).subscribe((result: TicketModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 97,
      recordId: id,
      userId: +this._auth.getUserId(),
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل");
    }
  }

  onDelete = function(id: number) {
      
  };

  onClickOptions() {
    this.opC = false
  }
  

  openTicketDet(tickectModel : TicketModel, status: number) {
    if (window.innerWidth > 1024) {
      if(this.opC == true) {
        localStorage.setItem("detActions", status.toString())
         this.detActionsStatus = +localStorage.getItem("detActions")
         
       this.showDetails = true
       this.showDetails2 = false
       this.showDetailsAll = true
       this.showDetailsAll2 = false
       this.tickectDetails = tickectModel
       this._ui.loadingStateChanged.next(true);
         this.ticketservice.getComments(tickectModel.ticketId).subscribe((response) => {
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
       }else {
         
         this.opC = true
       }
    }else if(window.innerWidth <= 1024) {
      if(this.opC == true) {
        localStorage.setItem("detActions", status.toString())
         this.detActionsStatus = +localStorage.getItem("detActions")
         var detailsArray = {
          detActionsStatus: +localStorage.getItem("detActions"),
          showDetails : true,
          showDetails2 : false,
          showDetailsAll : true,
          showDetailsAll2 : false,
          tickectDetails : tickectModel
        }
       
        this.openDetails(detailsArray)
      
      //  this._ui.loadingStateChanged.next(true);
      //    this.ticketservice.getComments(tickectModel.ticketId).subscribe((response) => {
      //      console.log(response);
           
      //      this._ui.loadingStateChanged.next(false);
      //      this.comments = response
      //      this.comments.forEach((com) => {
      //        com.crDate = com.crDate.replace('T', ' ')
      //        if (com.commentType === "ATTACH") {
      //          com.apiImagePath = "http://ticketingapi.autopay-mcs.com/" + com.apiImagePath
      //        }
      //      })
      //      // console.log(this.comments);
           
      //      // this.comments.forEach((com) => {
      //      //   com.edit = false
      //      // })
      //    })
       }else {
         
         this.opC = true
       }
    }
  }
  openTicketDet2(tickectModel : TicketModel, status: number) {
    if (window.innerWidth > 1024) {
      if(this.opC == true) {
        localStorage.setItem("detActions", status.toString())
        
        this.detActionsStatus = +localStorage.getItem("detActions")
        
      this.showDetails = false
      this.showDetails2 = true
      this.showDetailsAll = false
      this.showDetailsAll2 = true
      this.tickectDetails = tickectModel
      this._ui.loadingStateChanged.next(true);
        this.ticketservice.getComments(tickectModel.ticketId).subscribe((response) => {
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
      }else {
        
        this.opC = true
      }
    }
  }

  onNewComment() {
    this.openCommentDialog(this.tickectDetails)
  }

  openEntry = function (result: TicketModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(TicketEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(TicketEntryComponent, {
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
      this.dialogRef = this.dialog.open(TicketEntryComponent, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(TicketEntryComponent, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };
  openDetails = function (result: any) {
    if (result === undefined) {
      this.dialogRef5 = this.dialog5.open(DetailsEntryComponent, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef5 = this.dialog5.open(DetailsEntryComponent, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef5.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };
  openEntry3 = function (result: Send, ticket: TicketModel) {
    if (result === undefined) {
      this.dialogRef1 = this.dialog1.open(TicketCloseEntryComponent, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef1 = this.dialog1.open(TicketCloseEntryComponent, {
        disableClose: true,
        
        data: {
          dataRe: result,
          tick: ticket
        }
      });
    }
    this.dialogRef1.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };
  openEntry4 = function (result: Send, ticket: TicketModel) {
    if (result === undefined) {
      this.dialogRef1 = this.dialog1.open(TicketVerifyEntryComponent, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef1 = this.dialog1.open(TicketVerifyEntryComponent, {
        disableClose: true,
        
        data: {
          dataRe: result,
          tick: ticket
        }
      });
    }
    this.dialogRef1.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  openCommentDialog = function(result: TicketModel) {
    if (result === undefined) {
      this.dialogRef2 = this.dialog2.open(AddCommentComponent, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef2 = this.dialog2.open(AddCommentComponent, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef2.afterClosed().subscribe(() => {
      this.detActionsStatus = +localStorage.getItem("detActions")
      if(this.showDetailsAll === false) {
        this.openTicketDet2(this.tickectDetails, +localStorage.getItem("detActions") )
      }else {
        this.openTicketDet(this.tickectDetails, +localStorage.getItem("detActions") )
      }

      console.log(this.detActionsStatus);
      
    });
  }
  openAssignedDialog = function(result: TicketModel) {
    if (result === undefined) {
      this.dialogRef3 = this.dialog3.open(AssignedComponent, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef3 = this.dialog3.open(AssignedComponent, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef3.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  }
  openTransferDialog = function(result: TicketModel) {
    if (result === undefined) {
      this.dialogRef4 = this.dialog4.open(TransferComponent, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef4 = this.dialog4.open(TransferComponent, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef4.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  }
}
