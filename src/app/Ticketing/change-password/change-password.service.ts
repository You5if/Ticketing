import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';

import { Sources } from '../../dynamic-form/source.model';
import { Send } from '../../send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { FileListModel } from 'src/app/components/common/upload/upload-file.model';
import { AppUserPasswordModel } from './change-password.component';


@Injectable({
    providedIn: 'root'
})
export class ChangePWService {

    imgData: FileListModel;

    imgFullPath: string ;
    imgFullPath2: string ;
    imgExtention: string ;
    imgApiPath: string ;
    imgFileName: string ;
    imgOriginalFileName: string ;

    
    
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        
        ChangePassword(arr: AppUserPasswordModel){
           return this.http.post(this._globals.baseAPIUrl + 'AppUser/changepassword',arr);
        }

        

}
