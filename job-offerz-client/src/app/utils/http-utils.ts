import {Response} from "@angular/http";
/**
 * Created by DELL on 2017-10-22.
 */

export class HttpUtils {
  public static mapResponse(resp: Response): any {
    return resp.json();
  }
}
