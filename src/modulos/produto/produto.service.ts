import { Injectable, NotFoundException } from "@nestjs/common";
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

    // produtoEntity.nome = dadosDoProduto.nome;
    // produtoEntity.valor = dadosDoProduto.valor;
    // produtoEntity.quantidadeDisponivel = dadosDoProduto.quantidadeDisponivel;
    // produtoEntity.descricao = dadosDoProduto.descricao;
    // produtoEntity.categoria = dadosDoProduto.categoria;
    // produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
    // produtoEntity.imagens = dadosDoProduto.imagens;
    Object.assign(produtoEntity, dadosDoProduto as ProdutoEntity); //atribuições automáticas substituindo código acima.

    return await this.produtoRepository.save(produtoEntity);
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({ id });

    if (entityName === null) {
      throw new NotFoundException('O produto não foi encontrado.');
    }

    Object.assign(entityName, novosDados as ProdutoEntity);
    await this.produtoRepository.save(entityName);
  }

  async excluiProduto(id: string) {
    const resultado = await this.produtoRepository.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('O produto não foi encontrado');
    }
  }

  async listaProdutos() {
    const produtosGravados = await this.produtoRepository.find();
    return produtosGravados;
  }

}
