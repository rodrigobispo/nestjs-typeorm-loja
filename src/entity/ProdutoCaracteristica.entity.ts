import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProdutoEntity } from "./Produto.entity";

@Entity("produto_caracteristicas")
export class ProdutoCaracteristicaEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column({ name: "nome", length: 100, nullable: false })
  nome: string;

  @Column({ name: "descricao", length: 100, nullable: false })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicas,
  { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  produto: ProdutoEntity;

}
