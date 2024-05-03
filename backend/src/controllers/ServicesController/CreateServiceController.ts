import { FastifyRequest, FastifyReply } from "fastify"
import { CreateServiceService } from "../../services/ServicesServices/CreateServiceService"

class CreateServiceController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, description, value, numberInstallment, serviceTypeId } = request.body as { name: string, description: string, value: number, numberInstallment: number, serviceTypeId: string }

    const serviceService = new CreateServiceService()

    const service = await serviceService.execute({ name, description, value, numberInstallment, serviceTypeId })

    reply.send(service)
  }
}

export { CreateServiceController }