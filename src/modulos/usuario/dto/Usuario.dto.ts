import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator"
import { EmailEhUnico } from "../validacao/email-eh-unico.validator"

export class UsuarioDTO {

  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  nome: string

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail.' })
  email: string

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w_])(.{6,30})$/, {
    message: 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  })
  senha: string

}

/** Expressão regular: */
// 1. ^: Esse símbolo indica o início da string. Ou seja, a expressão regular vai verificar a partir do começo da senha.
// 2. (?=.*[a-z]): Essa parte da expressão verifica se há pelo menos uma letra minúscula (a-z) em qualquer posição da senha.
// 3. (?=.*[A-Z]): Aqui, verificamos se há pelo menos uma letra maiúscula (A-Z) em qualquer posição da senha.
// 4. (?=.*\d): Essa parte confere se há pelo menos um dígito (0-9) em qualquer posição da senha.
// 5. (?=.*\W+) => (?=.*[^\w_]): Nesta parte, verificamos se há pelo menos um caractere especial (por exemplo, !@#$%^&*()_-+=<>?/)
//    em qualquer posição da senha.
// 6. .{6,30}: Essa parte verifica se a senha tem um comprimento mínimo de 6 caracteres e um comprimento máximo de
//    30 caracteres. O ponto final (.) corresponde a qualquer caractere (exceto quebras de linha), e o quantificador {6,30}
//    específica que deve haver de 6 a 30 caracteres.
// 7. $: Esse símbolo indica o final da string. A expressão regular vai garantir que o padrão se estenda até o final da senha.
