import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  transform(senha: string) {
    return senha + 'abcdef';
  }
}
