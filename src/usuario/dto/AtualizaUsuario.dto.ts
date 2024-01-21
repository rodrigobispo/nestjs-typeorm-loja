import { PartialType } from "@nestjs/mapped-types"
import { UsuarioDTO } from "./Usuario.dto"

export class AtualizaUsuarioDTO extends PartialType(UsuarioDTO) {}
