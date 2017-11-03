import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.scss']
})
export class FavButtonComponent implements OnInit {

  @Input('favEnabled')
  favEnabled: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
