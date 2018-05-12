import { Injectable } from '@angular/core';
import {
    Http,
    Response,
    Headers,
    RequestOptions
} from '@angular/http';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import 'rxjs/add/operator/catch';
import { HttpClient, HttpHandler, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from './category.service';
import { Config } from './config';
import { Category } from '../model/category';
import { of } from 'rxjs/observable/of';


@Injectable()
export class ShareService {
    
    constructor(private _http: HttpClient) { }
    
    httpGet(_url:string): Observable<any> {
        
        return this._http.get(_url)
        .map((response: Response) => {
            return {
                data: response["data"]
              
            }
          

        }).
        catch(this.handleError);  
        
        
    }
    httpPost<T>(_url:string,entity:T):Observable<any> {
       
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            
            })
        };
        let body = JSON.stringify(entity);  
       console.log(body);
    
        return this._http.post(_url, body,httpOptions);
        // .subscribe(
        //     (val) => {
        //         console.log("POST call successful value returned in body", 
        //                     val);
               
        //     },
        //     response => {
        //         console.log("POST call in error", response);
        //     },
        //     () => {
        //         console.log("The POST observable is now completed.");
        //     });  
        
        
    }
    httpPut<T>(_url:string,entity:T): Observable<any> {
       
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            
            })
        };
        let body = JSON.stringify(entity);  
        return this._http.put(_url, body,httpOptions).   
        catch(this.handleError);  
        
        
    }
    httpDelete(url: string): Observable < any > {  
       
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            
            })
        };
      
        return this._http.delete(url,httpOptions);

        
      
    }  
    private handleError(error: Response) {  
      
        return Observable.throw(error.json().error || 'Server error');  
    }  

}