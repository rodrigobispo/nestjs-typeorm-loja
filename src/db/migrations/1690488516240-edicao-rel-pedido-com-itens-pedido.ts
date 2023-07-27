import { MigrationInterface, QueryRunner } from "typeorm";

export class EdicaoRelPedidoComItensPedido1690488516240 implements MigrationInterface {
    name = 'EdicaoRelPedidoComItensPedido1690488516240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_98cde64c0099054f3c30bd1ce51"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "itensPedidoId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "itensPedidoId" uuid`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_98cde64c0099054f3c30bd1ce51" FOREIGN KEY ("itensPedidoId") REFERENCES "itens_pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
