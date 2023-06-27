import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsPositive, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ProdutoCaracteristicaEntity } from "src/entity/ProdutoCaracteristica.entity";
import { ProdutoImagemEntity } from "src/entity/ProdutoImagem.entity";

export class ProdutoDTO {

  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  nome: string;

  @IsPositive()
  valor: number;

  @IsNumber()
  @IsPositive()
  quantidadeDisponivel: number;

  @IsNotEmpty()
  @MaxLength(100)
  descricao: string;

  @IsArray()
  // @ValidateNested()
  @Type(() => ProdutoCaracteristicaEntity)
  caracteristicas: ProdutoCaracteristicaEntity[];

  @IsArray()
  // @ValidateNested()
  @Type(() => ProdutoImagemEntity)
  imagens: ProdutoImagemEntity[];

  @IsNotEmpty()
  categoria: string;
}
