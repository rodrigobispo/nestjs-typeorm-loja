import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioService } from "../usuario.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {

  constructor(private usuarioRepository: UsuarioRepository, private usuarioService: UsuarioService) {}

  // async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
  //   const existeOutroUsuarioComEmail = await this.usuarioRepository.jaExisteComEmail(value);
  //   return !existeOutroUsuarioComEmail;
  // }

  // email-eh-unico.validator.ts

  async validate(value: any): Promise<boolean> {
    try {
      const usuarioComEmailExiste = await this.usuarioService.buscaPorEmail(value);
      return !usuarioComEmailExiste;
    } catch (erro) {
      if (erro instanceof NotFoundException) {
        return true;
      }
      throw erro;
    }
  }

}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, pripriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: pripriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicoValidator
    });
  }
}
