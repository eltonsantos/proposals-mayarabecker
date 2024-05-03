import { FastifyRequest, FastifyReply } from "fastify"
import { UpdateServiceTypeService } from "../../services/ServicesTypesServices/UpdateServiceTypeService"

class UpdateServiceTypeController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const { name, observation, tax, complement } = request.body as { name: string, observation: string, tax: string, complement: string }

    const serviceTypeService = new UpdateServiceTypeService()
    
    const serviceType = await serviceTypeService.execute({ id, name, observation, tax, complement })

    reply.send(serviceType)   
  }
}

export { UpdateServiceTypeController }