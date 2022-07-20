import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators';

import { Sources } from './dynamic-form/source.model';
import { Send } from './send.model';


@Injectable({
    providedIn: 'root'
})
export class GlobalSerivce {
   
    
    constructor(private http: HttpClient) {}



// controllers(model: Send) {
//     return this.http.post(this.baseUrl + 'TestTable/getentry', model);
// }

convertQuotation(last: any) {
  var re = /'/gi;
  var lastEdited = last
  for (let i = 0; i < lastEdited.records.length; i++) {
    if (lastEdited.records[i].type === "TextArea") {
      lastEdited.records[i].value = lastEdited.records[i].value.replace(re, "''");
    }else if (lastEdited.records[i].type === "Text") {
      lastEdited.records[i].value = lastEdited.records[i].value.replace(re, "''");
    } 
    
  }
  // var re = /'/gi;
  // var editedText: string
  // editedText = text.replace(re, "''"); 
  return lastEdited
}





}
