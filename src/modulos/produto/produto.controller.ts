import { Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors} from "@nestjs/common";
import { ProdutoDTO } from "./dto/Produto.dto";
import { ProdutoEntity } from "src/entity/Produto.entity";
import { randomUUID } from "crypto";
import { ProdutoService } from "./produto.service";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Controller('/produtos')
export class ProdutoController {

  constructor(
    private readonly produtoService: ProdutoService,
    @Inject(CACHE_MANAGER) private gerenciadorDeCache: Cache
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
  @UseInterceptors(CacheInterceptor)
  public async listaProdutos() {
    console.log("Listando todos os produtos...")
    return this.produtoService.listaProdutos();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  public async listaUm(@Param('id') id: string) {
    let produto = await this.gerenciadorDeCache.get<ProdutoEntity>(`produto-${id}`);

    if (!produto) {
      console.log('Obtendo produto do cache!');

      produto = await this.produtoService.listaUm(id);
      await this.gerenciadorDeCache.set(`produto-${id}`, produto);
    }

    return {
      mensagem: 'Produto localizado com sucesso.',
      produto,
    };
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
