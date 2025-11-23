import { RegistrarPagamento_UC } from "src/application/RegistrarPagamento_UC";
import { Bind, Body, Controller, Dependencies, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { PagamentoDTO } from "./dto/Pagamento.dto";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
@Dependencies(RegistrarPagamento_UC)
export class PagamentoController {
    constructor(private readonly registrarPagamentoUC: RegistrarPagamento_UC) {}

    @Post('registrarpagamento')
    @MessagePattern('registrar_pagamento')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Bind(Body())
    registrarPagamento(pagamentoDTO: PagamentoDTO): Promise<void> {
      return this.registrarPagamentoUC.run(pagamentoDTO);
    }
}
