import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidator } from "./validacao/email-eh-unico.validator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntity } from "src/entity/Usuario.entity";
import { UsuarioService } from "./usuario.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioRepository, EmailEhUnicoValidator, UsuarioService],
  exports: [UsuarioService]
})

export class UsuarioModule {}
