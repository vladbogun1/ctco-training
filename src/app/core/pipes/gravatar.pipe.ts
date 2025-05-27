import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Md5 } from 'ts-md5';

@Pipe({
  name: 'gravatar',
  standalone: true
})
export class GravatarPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(email: string, size: number = 80): SafeUrl {
    if (!email) {
      return this.getDefaultGravatar(size);
    }

    const trimmedEmail = email.trim().toLowerCase();
    const hash =  Md5.hashStr(trimmedEmail);
    const url = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=retro&r=g`;

    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private getDefaultGravatar(size: number): string {
    return `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=${size}`;
  }
}
