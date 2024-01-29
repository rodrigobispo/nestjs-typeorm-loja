import { Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(senha: string) {
    const salt = this.configService.get('SALT_PASSWORD');

    const senhaHash = await bcrypt.hash(senha, salt);

    return senhaHash;
  }
}
