import { FastifyRequest, FastifyReply } from "fastify"
import { CreateServiceTypeService } from "../../services/ServicesTypesServices/CreateServiceTypeService"

class CreateServiceTypeController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, observation, tax, complement } = request.body as { name: string, observation: string, tax: string, complement: string }

    const serviceTypeService = new CreateServiceTypeService()

    const serviceType = await serviceTypeService.execute({ name, observation, tax, complement })

    reply.send(serviceType)   
  }
}

export { CreateServiceTypeController }