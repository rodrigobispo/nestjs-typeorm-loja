import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "src/entity/Usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsuarioRepository {
  
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) {}
  // private usuarios: Array<UsuarioEntity> = [];

  async jaExisteComEmail(email: string) {
    const possivelUsuarioComEmail = await (await this.usuarioRepository.find()).find(usuario => usuario.email === email);

    return possivelUsuarioComEmail !== undefined;
  }

}
