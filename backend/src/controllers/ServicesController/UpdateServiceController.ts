import { FastifyRequest, FastifyReply } from "fastify"
import { UpdateServiceService } from "../../services/ServicesServices/UpdateServiceService"

class UpdateServiceController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const { name, description, value, numberInstallment, serviceTypeId } = request.body as { name: string, description: string, value: number, numberInstallment: number, serviceTypeId: string }

    const serviceService = new UpdateServiceService()
    
    const service = await serviceService.execute({ id, name, description, value, numberInstallment, serviceTypeId })

    reply.send(service)   
  }
}

export { UpdateServiceController }