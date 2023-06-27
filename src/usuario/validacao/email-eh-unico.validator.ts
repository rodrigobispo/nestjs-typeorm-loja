import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {

  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const existeOutroUsuarioComEmail = await this.usuarioRepository.jaExisteComEmail(value);
    return !existeOutroUsuarioComEmail;
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
