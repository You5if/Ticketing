import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppGlobals } from 'src/app/app.global';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Send } from 'src/app/send.model';
import { TicketEntry2Component } from './ticket-entry/ticket-entry.component';
import { TicketEntry3Component } from './ticket-entry3/ticket-entry.component';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  inquiry: string
  phNum: string
  claim: string
  complaint: string
  name:string;
  showNew:boolean = true
  clientNum:string = localStorage.getItem(this._globals.baseAppName + '_clientNum')

  ELEMENT_DATA: any[]

  displayedColumns: string[] = ['code', 'type', 'desc', 'add'];
  dataSource : any
  private routeSub: Subscription;
  
  constructor(
    private _globals: AppGlobals,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _auth: AuthService,
  ) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.phNum = params['id']
    if (params['id'] == '901625113') {
      this.name = "Milesh Shah"
      this.ELEMENT_DATA = [
        {code: '1103', type: 'Individual', desc: 'For house', add: 'H'},
        {code: '1104', type: 'Individual', desc: 'For car', add: 'He'},
        {code: '1105', type: 'Corporate', desc: 'For office', add: 'Li'},
       
      ];
      this.dataSource = this.ELEMENT_DATA
      localStorage.setItem(this._globals.baseAppName + '_clientName', this.name)
      this.showNew = false
    }else if (params['id'] == '912311708') {
      this.name = "Omi Patwa"
      this.ELEMENT_DATA = [
        {code: '1202', type: 'Individual', desc: 'For house', add: 'H'},
        {code: '1203', type: 'Corporate', desc: 'For office', add: 'Li'},
       
      ];
      this.dataSource = this.ELEMENT_DATA
      localStorage.setItem(this._globals.baseAppName + '_clientName', this.name)
      this.showNew = false
    }else if (params['id'] == '123036016') {
      this.name = "Nizar saleh"
      this.ELEMENT_DATA = [
        {code: '1306', type: 'Individual', desc: 'For house', add: 'H'},
        {code: '1307', type: 'Corporate', desc: 'For office', add: 'Li'},
        {code: '1308', type: 'Corporate', desc: 'For employees', add: 'Li'},
       
      ];
      this.dataSource = this.ELEMENT_DATA
      localStorage.setItem(this._globals.baseAppName + '_clientName', this.name)
      this.showNew = false
    }else if (params['id'] == '912392661') {
      this.name = "Tarig Khalil"
      this.ELEMENT_DATA = [
        {code: '1407', type: 'Corporate', desc: 'For office', add: 'Li'},
        {code: '1408', type: 'Individual', desc: 'For employees', add: 'Li'},
       
      ];
      this.dataSource = this.ELEMENT_DATA
      localStorage.setItem(this._globals.baseAppName + '_clientName', this.name)
      this.showNew = false
    }else if (params['id'] == '912366750') {
      this.name = "Tariq Samrawi"
      this.ELEMENT_DATA = [
        {code: '1503', type: 'Individual', desc: 'For house', add: 'H'},
        {code: '1504', type: 'Individual', desc: 'For car', add: 'He'},
        {code: '1505', type: 'Corporate', desc: 'For employees', add: 'Li'},
        {code: '1506', type: 'Corporate', desc: 'For office', add: 'Li'},
       
      ];
      this.dataSource = this.ELEMENT_DATA
      localStorage.setItem(this._globals.baseAppName + '_clientName', this.name)
      this.showNew = false
    }else {
      this.name = "New customer"
      this.showNew = true
    }
    });
    
  }

  onOpenNew = function (type: string) {
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
    
    this.openEntry2(this.model, type);
  };
  onOpenNew2 = function (code: string,type: string,desc: string) {
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
    
    this.openEntry3(this.model, code, type, desc);
  };

  openEntry3 = function (result: Send,code: string,type: string,desc: string) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(TicketEntry3Component, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(TicketEntry3Component, {
        disableClose: true,
        
        data: {
          model: result,
          typeName: type,
          descName: desc,
          codeName: code,
          number: this.phNum
        }
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };
  openEntry2 = function (result: Send,type: string) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(TicketEntry2Component, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(TicketEntry2Component, {
        disableClose: true,
        
        data: {
          model: result,
          typeName: type,
          number: this.phNum
        }
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

}
