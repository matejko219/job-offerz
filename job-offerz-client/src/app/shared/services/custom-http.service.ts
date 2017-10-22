import {Injectable, Injector} from '@angular/core';
import {
  Http, RequestOptions, RequestOptionsArgs, Request, Response, Headers,
  XHRBackend
} from "@angular/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Injectable()
export class CustomHttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions,
              private router: Router, private injector: Injector) {
    super(backend, defaultOptions);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      this.setHeaders(options);
    } else {
      this.setHeaders(url);
    }

    return super.request(url, options).catch(this.catchErrors);
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

    if (error.status === 401 || error.status === 403) {
      this.router.navigate(['login']);
    }

    return Observable.throw(err || errMsg);
  }

  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    objectToSetHeadersTo.headers.set('Authorization', `Bearer ${this.authService.getToken()}`);
    objectToSetHeadersTo.headers.set('Content-Type', 'application/json');
  }

  public get authService(): AuthenticationService {
    return this.injector.get(AuthenticationService);
  }
}
