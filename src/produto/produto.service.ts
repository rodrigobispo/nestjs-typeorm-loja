import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "src/entity/Produto.entity";
import { Repository } from "typeorm";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { ProdutoDTO } from "./dto/Produto.dto";

@Injectable()
export class ProdutoService {

  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>
  ) {}

  async criaProduto(dadosDoProduto: ProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    produtoEntity.nome = dadosDoProduto.nome;
    produtoEntity.valor = dadosDoProduto.valor;
    produtoEntity.quantidadeDisponivel = dadosDoProduto.quantidadeDisponivel;
    produtoEntity.descricao = dadosDoProduto.descricao;
    produtoEntity.categoria = dadosDoProduto.categoria;
    produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
    produtoEntity.imagens = dadosDoProduto.imagens;

    return await this.produtoRepository.save(produtoEntity);
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
