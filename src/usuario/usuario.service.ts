import { Injectable, NotFoundException } from "@nestjs/common";
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

    // usuario.nome = dadosDoUsuario.nome;
    // usuario.email = dadosDoUsuario.email;
    // usuario.senha = dadosDoUsuario.senha;
    Object.assign(usuario, dadosDoUsuario as UsuarioEntity); //atribuições automáticas substituindo código acima.

    return await this.usuarioRepository.save(usuario);
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    // await this.usuarioRepository.update(id, novosDados);
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null)
      throw new NotFoundException('O usuário não foi encontrado.');

    Object.assign(usuario, novosDados as UsuarioEntity);

    return this.usuarioRepository.save(usuario);
  }

  async excluiUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id);

    if (!resultado.affected)
      throw new NotFoundException('O usuário não foi encontrado.');
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

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }

}
