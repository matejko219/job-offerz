import { Component, OnInit } from '@angular/core';
import {AppConsts} from "../../utils/app-consts";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  appName: string = AppConsts.APP_NAME;

  constructor() { }

  ngOnInit() {
  }

}
