import { Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors} from "@nestjs/common";
import { ProdutoDTO } from "./dto/Produto.dto";
import { ProdutoEntity } from "src/entity/Produto.entity";
import { randomUUID } from "crypto";
import { ProdutoService } from "./produto.service";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller('/produtos')
export class ProdutoController {

  constructor(
    private readonly produtoService: ProdutoService
  ) {}

  @Post()
  public async criaProduto(@Body() dadosDoProduto: ProdutoDTO) {
    const produtoCadastrado = await this.produtoService.criaProduto(dadosDoProduto);

    return {
      mensagem: 'Produto cadastrado com sucesso.',
      produto: produtoCadastrado,
    }
  }

  @Get()
  public async listaProdutos() {
    console.log("Listando produtos...")
    return this.produtoService.listaProdutos();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  public async listaUm(@Param('id') id: string) {
    console.log("Buscando produto no banco de dados!")
    return await this.produtoService.listaUm(id);
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
