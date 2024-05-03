import { FastifyRequest, FastifyReply } from "fastify"
import { DeleteServiceTypeService } from "../../services/ServicesTypesServices/DeleteServiceTypeService"

class DeleteServiceTypeController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const serviceTypeService = new DeleteServiceTypeService()

    const serviceType = await serviceTypeService.execute({ id })

    reply.send(serviceType)    
  }
}

export { DeleteServiceTypeController }