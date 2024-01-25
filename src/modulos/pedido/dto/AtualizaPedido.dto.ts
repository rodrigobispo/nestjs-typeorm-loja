import { PartialType } from '@nestjs/mapped-types';
import { CriaPedidoDTO } from './CriaPedido.dto';
import { StatusPedido } from '../enum/status-pedido.enum';
import { IsEnum } from 'class-validator';

export class AtualizaPedidoDTO extends PartialType(CriaPedidoDTO) {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
