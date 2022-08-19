import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { UIService } from '../UI.service';
import { AlertifyService } from 'src/app/alertify.service';

@Component({
  selector: 'app-please-wait',
  templateUrl: './please-wait.component.html',
  styleUrls: ['./please-wait.component.scss']
})
export class PleaseWaitComponent implements OnInit {

  isLoading = false;
  private loadingSubs!: Subscription;

  constructor(
    private dialogRef: MatDialogRef<PleaseWaitComponent>,
    private uiService: UIService,
    private alertify: AlertifyService,

  ) { }

  ngOnInit() {
    var timeleft = 5;
    var conutdown = setInterval(() =>{
      if(timeleft <= 0){
        this.uiService.loadingStateChanged.next(false)
        this.dialogRef.close();
        // console.log("Loading Stopped");
        this.alertify.error('Check in internet connection or call system provider')
        clearInterval(conutdown);
      }
      timeleft -= 1;
    }, 1000);
    
    this.dialogRef.disableClose = true;
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      if ( isLoading !== true ) {
        this.dialogRef.close();
        clearInterval(conutdown)
      }else {
        // var conutdown = setInterval(() =>{
        //   if(timeleft <= 0){
        //     this.uiService.loadingStateChanged.next(false)
        //     // this.dialogRef.close();
        //     console.log("Loading Stopped");
        //     clearInterval(conutdown);
        //   }
        //   timeleft -= 1;
        // }, 1000);
      }
    });
  }

}
