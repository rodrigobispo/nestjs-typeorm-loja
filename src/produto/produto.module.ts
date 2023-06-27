import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "src/entity/Produto.entity";
import { ProdutoService } from "./produto.service";


@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController],
  providers: [ProdutoService]
})
export class ProdutoModule {}
