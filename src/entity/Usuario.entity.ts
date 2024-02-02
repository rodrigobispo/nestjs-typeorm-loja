import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn } from "typeorm"
import { PedidoEntity } from "./pedido.entity"
import { Exclude, Expose } from "class-transformer"

@Exclude()
@Entity({ name: 'usuarios' })
export class UsuarioEntity {

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Expose()
  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string

  @Expose()
  @Column({ name: 'email', length: 70, nullable: false })
  email: string

  @Column({ name: 'senha', length: 255, nullable: false })
  senha: string

  @Expose()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @Expose()
  @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)
  pedidos: PedidoEntity[];
}
