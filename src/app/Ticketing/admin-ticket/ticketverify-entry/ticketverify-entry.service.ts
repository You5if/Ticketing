import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})


export class TicketVerifyEntryService {

    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}

        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'TicketVerify/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
           return response.json();
           }), catchError(this._cf.handleError));
        }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'TicketVerify/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'TicketVerify/edituniv',arr);
        }

        getClosedTicketId(id: number): Observable<any> {
            return this.httpClient.get<any>(this._globals.baseAPIUrl + 'ddl/getdropdown/ticketcloseid/ticketclose/comment/ticketid='+ id +'/false' ).pipe(
            map((result: any) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
}

