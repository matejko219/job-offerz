import {Injectable, Injector} from '@angular/core';
import {
  Http, RequestOptions, RequestOptionsArgs, Request, Response, Headers,
  XHRBackend
} from "@angular/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class CustomHttpService extends Http {

  apiUrl = environment.apiUrl;

  constructor(backend: XHRBackend,
              defaultOptions: RequestOptions,
              private router: Router,
              private injector: Injector) {
    super(backend, defaultOptions);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      this.setHeaders(options);
      url = this.addApiUrl(url);
    } else {
      this.setHeaders(url);
      url.url = this.addApiUrl(url.url);
    }

    return super.request(url, options).catch((error) => {
      if (error.status === 401 || error.status === 403) {
        this.router.navigate(['login']);
      }
      return this.catchErrors(error);
    });
  }

  private addApiUrl(url: string): string {
    if (!url.startsWith('http')) {
      return `${this.apiUrl}${url}`;
    } else return url;
  }

  private catchErrors(error: Response | any) {
    let errMsg: string;
    let err;
    if (error instanceof Response) {
      const body = error.json() || '';
      err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);

    return Observable.throw(err || errMsg);
  }

  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    if (!objectToSetHeadersTo.headers.getAll('Authorization')) {
      objectToSetHeadersTo.headers.set('Authorization', `Bearer ${this.authService.getToken()}`);
    }
    if (!objectToSetHeadersTo.headers.getAll('Content-Type')) {
      objectToSetHeadersTo.headers.set('Content-Type', 'application/json');
    }
  }

  private get authService(): AuthenticationService {
    return this.injector.get(AuthenticationService);
  }

}
