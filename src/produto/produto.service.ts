import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "src/entity/Produto.entity";
import { Repository } from "typeorm";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Injectable()
export class ProdutoService {

  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>
  ) {}

  async criaProduto(produto: ProdutoEntity) {
    return await this.produtoRepository.save(produto);
  }

  async atualizaProduto(id: string, produto: AtualizaProdutoDTO) {
    await this.produtoRepository.update(id, produto);
  }

  async excluiProduto(id: string) {
    await this.produtoRepository.delete(id);
  }

  async listaProdutos() {
    const produtosGravados = await this.produtoRepository.find();
    return produtosGravados;
  }

}
