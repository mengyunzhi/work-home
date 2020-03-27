import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl, SafeValue } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

export class DomSanitizerStub extends DomSanitizer {
  bypassSecurityTrustHtml(value: string): SafeHtml {
    return undefined;
  }

  bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl {
    return undefined;
  }

  bypassSecurityTrustScript(value: string): SafeScript {
    return undefined;
  }

  bypassSecurityTrustStyle(value: string): SafeStyle {
    return undefined;
  }

  bypassSecurityTrustUrl(value: string): SafeUrl {
    return undefined;
  }

  sanitize(context: SecurityContext, value: SafeValue | string | null): string | null;
  sanitize(context: SecurityContext, value: SafeValue | string | null | {}): string | null {
    return undefined;
  }
}
