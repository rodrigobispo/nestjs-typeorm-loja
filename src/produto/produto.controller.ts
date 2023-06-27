import { Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put } from "@nestjs/common";
import { ProdutoDTO } from "./dto/Produto.dto";
import { ProdutoEntity } from "src/entity/Produto.entity";
import { randomUUID } from "crypto";
import { ProdutoService } from "./produto.service";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Controller('/produtos')
export class ProdutoController {

  constructor(
    private readonly produtoService: ProdutoService
  ) {}

  @Post()
  public async criaProduto(@Body() dadosDoProduto: ProdutoDTO) {

    const produto = new ProdutoEntity();

    produto.id = randomUUID();
    produto.nome = dadosDoProduto.nome;
    produto.usuarioId = dadosDoProduto.usuarioId;
    produto.valor = dadosDoProduto.valor;
    produto.quantidade = dadosDoProduto.quantidade;
    produto.descricao = dadosDoProduto.descricao;
    produto.categoria = dadosDoProduto.categoria;
    produto.caracteristicas = dadosDoProduto.caracteristicas;
    produto.imagens = dadosDoProduto.imagens;

    return this.produtoService.criaProduto(produto);
  }

  @Get()
  public async listaProdutos() {
    console.log("Listando produtos...")
    return this.produtoService.listaProdutos();
  }

  @Put('/:id')
  async atualizaProduto(
    @Param('id') id: string,
    @Body() novosDados: AtualizaProdutoDTO
  ) {
    const produtoAtualizado = await this.produtoService.atualizaProduto(id, novosDados);

    return {
      usuario: produtoAtualizado,
      mensagem: 'Produto atualizado com sucesso.'
    }
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    await this.produtoService.excluiProduto(id);
    return `Produto ${id} removido com sucesso.`
  }
}
