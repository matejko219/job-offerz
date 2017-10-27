import {Authority} from "./authority";
/**
 * Created by DELL on 2017-10-24.
 */
export class User {
  _id: string;
  login: string;
  password: string;
  email: string;
  authority: Authority;
  createDate: Date;
}
