import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.scss']
})
export class FavButtonComponent implements OnInit {

  @Input('favEnabled')
  favEnabled: boolean = true;

  @Input('isInMyFavorite')
  isInMyFavorite: boolean = false;

  @Output()
  favClick: EventEmitter<void> = new EventEmitter<void>();

  deleteLabel = 'Usuń z ulubionych';
  addLabel = 'Dodaj do ulubionych';

  constructor() { }

  ngOnInit() {
  }

  emitClick(event: Event) {
    event.stopPropagation();
    this.favClick.next();
  }

}
