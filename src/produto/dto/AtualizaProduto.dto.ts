import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsPositive, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ProdutoImagemEntity } from "src/entity/ProdutoImagem.entity";
import { ProdutoCaracteristicaEntity } from "src/entity/ProdutoCaracteristica.entity";

export class AtualizaProdutoDTO {

  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  @IsOptional()
  nome: string;

  @IsPositive()
  @IsOptional()
  valor: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantidadeDisponivel: number;

  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  descricao: string;

  @IsArray()
  @ValidateNested()
  @Type(() => ProdutoCaracteristicaEntity)
  @IsOptional()
  caracteristicas: ProdutoCaracteristicaEntity[];

  @IsArray()
  @ValidateNested()
  @Type(() => ProdutoImagemEntity)
  @IsOptional()
  imagens: ProdutoImagemEntity[];

  @IsNotEmpty()
  @IsOptional()
  categoria: string;

  @IsNotEmpty()
  @IsOptional()
  usuarioId: string;
}
