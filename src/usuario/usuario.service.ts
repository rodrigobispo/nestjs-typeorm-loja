import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "src/entity/Usuario.entity";
import { Repository } from "typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { UsuarioDTO } from "./dto/Usuario.dto";

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) {}

  async criaUsuario(dadosDoUsuario: UsuarioDTO): Promise<UsuarioEntity> {
    const usuario = new UsuarioEntity();

    usuario.nome = dadosDoUsuario.nome;
    usuario.email = dadosDoUsuario.email;
    usuario.senha = dadosDoUsuario.senha;

    return await this.usuarioRepository.save(usuario);
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
