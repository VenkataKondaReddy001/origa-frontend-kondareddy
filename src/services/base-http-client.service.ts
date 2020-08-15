import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { catchError, retry } from "rxjs/operators";
import { throwError, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpClientService {
  private externalHttpClient: HttpClient;
  constructor(private _httpClient: HttpClient,
    handler: HttpBackend
  ) {
    this.externalHttpClient = new HttpClient(handler);
  }
  private retryLimit = 1;
  /** To process get request */
  getData<T>(url: string) {
    url = url;

    return this._httpClient.get<T>(url, this.prepareHeader(null));
    // .pipe(
    // catchError(this.handleError<T>(url))
    // );
  }

  /** To process post request */
  postData<T>(url: string, data) {
    url =  url;
    return this._httpClient.post<T>(url, JSON.stringify(data), this.prepareHeader(null));
    // .pipe(
    //   catchError(this.handleError(url, [])));
  }

  /** To process put request */
  putData<T>(url: string, data) {
    url = url;
    return this._httpClient.put<T>(url, JSON.stringify(data), this.prepareHeader(null));
    // .pipe(catchError((err: any) => {
    //   return throwError(err);
    // }));
  }
  /** To process patch request */
  patchData<T>(url: string, data) {
    url = url;
    return this._httpClient.patch<T>(url, JSON.stringify(data), this.prepareHeader(null));
    // .pipe(catchError((err: any) => {
    //   return throwError(err);
    // }));
  }
  /** To process delete request */
  deleteData(url: string) {
    url = url;
    return this._httpClient.delete(url, this.prepareHeader(null));
    // .pipe(catchError((err: any) => {
    //   return throwError(err);
    // }));
  }
  /**
   * It is used to call third party urls. It will not go through the interceptor.
   * @param url url of the thrid party api
   */
  public getThirdPartyCall(url?: any): Observable<any> {
    return this.externalHttpClient.get<any>(url).pipe(
      catchError(this.handleError(url)));
  }
  /**
   * Gets the file content as blob. It will not go through the interceptor.
   * @param filepath path of the file 
   * @param contentType content type ex: application/pdf for downloading pdf file and text/html for downloading text files.
   */
  public downloadFile(filepath, contentType): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', contentType);
    return this.externalHttpClient.get(filepath, { headers: headers, responseType: 'blob' as 'json' });
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** To process post request with FormData*/
  postFormData<T>(url: string, formData) {
    url = url;
    return this._httpClient.post<T>(url, formData);
    // .pipe(
    //   catchError(this.handleError(url, [])));
  }
    /** To process put request with FormData*/
  putFormData<T>(url: string, formData) {
    url = url;
    return this._httpClient.put<T>(url, formData);
    // .pipe(
    //   catchError(this.handleError(url, [])));
  }


  private prepareHeader(headers: HttpHeaders | null): object {
    headers = headers || new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return {
      headers: headers
    }
  }
}
