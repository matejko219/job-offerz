import { Pipe, PipeTransform } from '@angular/core';
const linkify = require('linkifyjs');
const linkifyHtml = require('linkifyjs/html');

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return linkifyHtml(value);
    }
  }

}
