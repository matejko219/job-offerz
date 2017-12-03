import {MatPaginatorIntl} from "@angular/material";
/**
 * Created by DELL on 2017-12-03.
 */
export class MatPaginatorIntlPl extends MatPaginatorIntl{
  itemsPerPageLabel = 'Na stronie:';
  nextPageLabel     = 'Następna strona';
  previousPageLabel = 'Poprzednia strona';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) {
      return `0 z ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} z ${length}`;
  }
}
