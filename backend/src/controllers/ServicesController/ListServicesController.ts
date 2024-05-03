import { FastifyRequest, FastifyReply } from "fastify"
import { ListServicesService } from "../../services/ServicesServices/ListServicesService"

class ListServicesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listServicesService = new ListServicesService()

    const services = await listServicesService.execute()

    reply.send(services)
  }
}

export { ListServicesController }