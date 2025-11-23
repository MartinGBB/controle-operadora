import { ConsultarStatusService } from "../domain/services/ConsultarStatusAssinatura.service";
import { Injectable } from "@nestjs/common";
import { Dependencies } from "@nestjs/common";

@Injectable()
@Dependencies(ConsultarStatusService)
export class ConsultarStatus_UC {
    constructor(private readonly service: ConsultarStatusService) {}
    async run(codAssinatura: number): Promise<boolean> {
        return this.service.consultarStatusAssinatura(codAssinatura);
    }
}
