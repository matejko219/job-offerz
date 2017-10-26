import {CustomHttpService} from "../shared/services/custom-http.service";
import {XHRBackend, RequestOptions} from "@angular/http";
import {Router} from "@angular/router";
import {Injector} from "@angular/core";

/**
 * Created by DELL on 2017-10-22.
 */
export function CustomHttpFactory(backend: XHRBackend, options: RequestOptions, router: Router, injector: Injector) {
  return new CustomHttpService(backend, options, router, injector);
}
