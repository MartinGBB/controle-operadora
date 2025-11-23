import { ConsultarStatusService } from "../domain/services/ConsultarStatusAssinatura.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConsultarStatus_UC {
    constructor(private readonly service: ConsultarStatusService) {}
    async run(codAssinatura: number): Promise<boolean> {
        return this.service.consultarStatusAssinatura(codAssinatura);
    }
}
