import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "src/entity/Usuario.entity";
import { Repository } from "typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Injectable()
export class UsuarioService {
  
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) {}

  async criaUsuario(usuario: UsuarioEntity) {
    await this.usuarioRepository.save(usuario);
  }

  async atualizaUsuario(id: string, usuario: AtualizaUsuarioDTO) {
    await this.usuarioRepository.update(id, usuario);
  }

  async excluiUsuario(id: string) {
    await this.usuarioRepository.delete(id);
  }

  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const listaDeUsuarios = usuariosSalvos.map(
      usuario => new ListaUsuarioDTO(
        usuario.nome,
        usuario.id,
        usuario.email
      )
    );
    return listaDeUsuarios;
  }

}
