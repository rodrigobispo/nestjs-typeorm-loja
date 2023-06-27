import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioDTO } from './dto/Usuario.dto';
import { UsuarioEntity } from 'src/entity/Usuario.entity';
import { v4 as uuid } from 'uuid';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {

  constructor(
    private usuarioService: UsuarioService
  ) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: UsuarioDTO) {
    const usuarioCadastrado = await this.usuarioService.criaUsuario(dadosDoUsuario);
    return {
      usuario: new ListaUsuarioDTO(
        usuarioCadastrado.nome,
        usuarioCadastrado.id,
        usuarioCadastrado.email
      ),
      messagem: `Usuário ${usuarioCadastrado.nome} com id ${usuarioCadastrado.id} criado com sucesso.`,
    };
  }

  @Get()
  async listaUsuarios() {
    const usuarios = await this.usuarioService.listaUsuarios();
    return usuarios;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, novosDados);

    return {
      usuario: usuarioAtualizado,
      mensagem: 'Usuário atualizado com sucesso.'
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    await this.usuarioService.excluiUsuario(id);
    return `Usuário ${id} removido com sucesso.`
  }

}
