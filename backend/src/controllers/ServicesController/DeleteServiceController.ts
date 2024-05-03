import { FastifyRequest, FastifyReply } from "fastify"
import { DeleteServiceService } from "../../services/ServicesServices/DeleteServiceService"

class DeleteServiceController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const serviceService = new DeleteServiceService()

    const service = await serviceService.execute({ id })

    reply.send(service)    
  }
}

export { DeleteServiceController }