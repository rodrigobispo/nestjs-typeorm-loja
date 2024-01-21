/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PedidoEntity } from '../entity/pedido.entity';
import { UsuarioEntity } from '../entity/Usuario.entity';
import { ItemPedidoEntity } from '../entity/item-pedido.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ProdutoEntity } from '../entity/Produto.entity';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';

@Injectable()
export class PedidoService {

  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>
  ) { }

  private async buscaUsuario(usuarioId) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (usuario === null) {
      throw new NotFoundException('O usuário não foi encontrado.');
    }
    return usuario;
  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId);
    const produtosIds = dadosDoPedido.itensPedido.map((itemPedido) => itemPedido.produtoId);
    const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) });

    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId
      );

      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.itensPedido = itensPedidoEntidades;
    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);

    return pedidoCriado;
  }

  private trataDadosDoPedido(
    dadosDoPedido: CriaPedidoDTO,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId
      );
      if (produtoRelacionado === undefined) {
        throw new NotFoundException(`O produto com id ${itemPedido.produtoId} não foi encontrado`);
      }
      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(`A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponível (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}`);
      }
    });
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    const usuario = await this.buscaUsuario(usuarioId);

    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }

  async atualizaPedido(id: string, dto: AtualizaPedidoDTO) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    // throw new NotFoundException('Simulando erro do banco de dados...');

    if (pedido === null) {
      throw new NotFoundException('O pedido não foi encontrado.');
    }

    Object.assign(pedido, dto);

    return this.pedidoRepository.save(pedido);
  }

}
