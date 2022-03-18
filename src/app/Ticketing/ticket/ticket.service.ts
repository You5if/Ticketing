import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { map, catchError } from 'rxjs/operators';
import { element, elementClassProp } from '@angular/core/src/render3';
import { Http, Response } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { TicketAttachModel, TicketCommentModel, TicketModel } from './ticket.model';

@Injectable({
providedIn: 'root'
})

// Definition of service class
export class TicketService {

   // Constructor definition
   constructor(
       private _globals: AppGlobals,
       private httpClient: HttpClient,
       private _cf: CommonService,
       private http: Http,
       private _auth: AuthService,
     ) {
     }

   // Get entry method of the model, which fethces data based on provided id (int)
   getTicketEntry(id: number): Observable<TicketModel> {
      return this.httpClient.get<TicketModel>(this._globals.baseAPIUrl + 'Ticket/' + id).pipe(
      map((result: TicketModel) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }

   // Submit the form data to api through this method, (verify the audit column parameters are passed properly before production version is released)
   getTicketSubmit(data: TicketModel) {
      data.auditColumns = {
      'userId': 1,
      'hostname': 'test',
      'ipaddress': 'test',
      'devicetype': 'test',
      'macaddress': 'test',
      'companyId': 10001
      };
      switch (data.entryMode) {

          // Case A is for adding a new record
          case 'A': {
          return this.http.post(this._globals.baseAPIUrl + 'Ticket/create', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          // Case E is for editing an existing record
          case 'E': {
          return this.http.post(this._globals.baseAPIUrl + 'Ticket/edit', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          // Case D is for deleting a record
          case 'D': {
          return this.http.post(this._globals.baseAPIUrl + 'Ticket/delete', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          default: {
          break;
          }
      }
     }

     getComments(id: number): Observable<any[]> {
      return this.httpClient.get<any[]>(this._globals.baseAPIUrl + 'Ticket/getsummary/' + id).pipe(
      map((result: any[]) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }

     badgeOfUnassignedForAll (id:number): Observable<any> {
        return this.httpClient.get<any[]>(this._globals.baseAPIUrl + 'Ticket/openticketcount/' + id).pipe(
         map((result: any[]) => {
         return result;
         }), catchError(this._cf.handleError)
         );
     }

     badgeOfAssignedForSupervisorOrManager (id:number): Observable<any> {
        return this.httpClient.get<any[]>(this._globals.baseAPIUrl + 'Ticket/assignedticketcount/' + id).pipe(
         map((result: any[]) => {
         return result;
         }), catchError(this._cf.handleError)
         );
     }

     badgeOfAssignedForTechnician (id:number): Observable<any> {
        return this.httpClient.get<any[]>(this._globals.baseAPIUrl + 'Ticket/assignedtickettechcount/' + id).pipe(
         map((result: any[]) => {
         return result;
         }), catchError(this._cf.handleError)
         );
     }

     badgeOfClosedForAll (id:number): Observable<any> {
        return this.httpClient.get<any[]>(this._globals.baseAPIUrl + 'Ticket/closeticketcount/' + id).pipe(
         map((result: any[]) => {
         return result;
         }), catchError(this._cf.handleError)
         );
     }

     badgeOfVerifiedForAll (id:number): Observable<any> {
        return this.httpClient.get<any[]>(this._globals.baseAPIUrl + 'Ticket/verifyticketcount/' + id).pipe(
         map((result: any[]) => {
         return result;
         }), catchError(this._cf.handleError)
         );
     }

     getNewTickets(id: number): Observable<TicketModel[]> {
      return this.httpClient.get<TicketModel[]>(this._globals.baseAPIUrl + 'Ticket/openticket/' + id).pipe(
      map((result: TicketModel[]) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
     getAssignedTickets(id: number): Observable<TicketModel[]> {
      return this.httpClient.get<TicketModel[]>(this._globals.baseAPIUrl + 'Ticket/assignedticket/' + id).pipe(
      map((result: TicketModel[]) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
     getClosedTickets(id: number): Observable<TicketModel[]> {
      return this.httpClient.get<TicketModel[]>(this._globals.baseAPIUrl + 'Ticket/closeticket/' + id).pipe(
      map((result: TicketModel[]) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
     getVerifyTickets(id: number): Observable<TicketModel[]> {
      return this.httpClient.get<TicketModel[]>(this._globals.baseAPIUrl + 'Ticket/verifyticket/' + id).pipe(
      map((result: TicketModel[]) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
     getAssignedTicketsForTech(id: number): Observable<TicketModel[]> {
      return this.httpClient.get<TicketModel[]>(this._globals.baseAPIUrl + 'Ticket/assignedtickettech/' + id).pipe(
      map((result: TicketModel[]) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
     acceptBtn(userId:number ,id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl + 'Ticket/acceptticket/' + userId + '/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }

     

     CreateAttach(arr: TicketAttachModel){
      return this.http.post(this._globals.baseAPIUrl + 'TicketAttach/create',arr);
   }
}
