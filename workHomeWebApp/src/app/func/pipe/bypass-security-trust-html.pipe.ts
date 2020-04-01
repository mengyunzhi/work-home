import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'bypassSecurityTrustHtml'
})
export class BypassSecurityTrustHtmlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(html: any, args?: any): any {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

}
