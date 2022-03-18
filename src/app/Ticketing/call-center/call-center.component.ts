import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';

@Component({
  selector: 'app-call-center',
  templateUrl: './call-center.component.html',
  styleUrls: ['./call-center.component.scss']
})
export class CallCenterComponent implements OnInit {

  submit: string;
    cancel: string;
    clientNumber:string;
    clientNum:string = ""
    direction: string;
  constructor(
    private _globals: AppGlobals,
    private router: Router,
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
  }

  onSubmit() {
    localStorage.setItem(this._globals.baseAppName + '_clientNum', this.clientNum)
    this.router.navigate(['/System', this.clientNum]);
  }
  

}
