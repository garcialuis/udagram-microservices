import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FeedItem } from '../feed/models/feed-item.model';
import { catchError, tap, map } from 'rxjs/operators';

const API_HOST = environment.apiHost;
const FEED_API_HOST = environment.feedApiHost;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  token: string;

  constructor(private http: HttpClient) {
  }

  handleError(error: Error) {
    alert(error.message);
  }

  setAuthToken(token) {
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `jwt ${token}`);
    this.token = token;
  }

  get(endpoint): Promise<any> {
    var url = endpoint;
    
    if (url.substring(1, 5) === "user"){
      url = API_HOST;
    }else if(url.substring(1, 5) == "feed"){
      url = FEED_API_HOST;
    }

    url = `${url}${endpoint}`;
    const req = this.http.get(url, this.httpOptions).pipe(map(this.extractData));

    return req
            .toPromise()
            .catch((e) => {
              this.handleError(e);
              throw e;
            });
  }

  post(endpoint, data): Promise<any> {
    var url = endpoint;
    
    if (url.substring(1, 5) === "user"){
      url = API_HOST;
    }else if(url.substring(1, 5) == "feed"){
      url = FEED_API_HOST;
    }

    url = `${url}${endpoint}`;
    // const url = `${API_HOST}${endpoint}`;
    return this.http.post<HttpEvent<any>>(url, data, this.httpOptions)
            .toPromise()
            .catch((e) => {
              this.handleError(e);
              throw e;
            });
  }

  async upload(endpoint: string, file: File, payload: any): Promise<any> {
    const signed_url = (await this.get(`${endpoint}/signed-url/${file.name}`)).url;

    const headers = new HttpHeaders({'Content-Type': file.type});
    const req = new HttpRequest( 'PUT', signed_url, file,
                                  {
                                    headers: headers,
                                    reportProgress: true, // track progress
                                  });

    return new Promise ( resolve => {
        this.http.request(req).subscribe((resp) => {
        if (resp && (<any> resp).status && (<any> resp).status === 200) {
          resolve(this.post(endpoint, payload));
        }
      });
    });
  }

  /// Utilities
  private extractData(res: HttpEvent<any>) {
    const body = res;
    return body || { };
  }
}