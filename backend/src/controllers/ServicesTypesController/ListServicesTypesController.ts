import { FastifyRequest, FastifyReply } from "fastify"
import { ListServicesTypesService } from "../../services/ServicesTypesServices/ListServicesTypesService"

class ListServicesTypesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listServicesTypesService = new ListServicesTypesService()

    const servicesTypes = await listServicesTypesService.execute()

    reply.send(servicesTypes) 
  }
}

export { ListServicesTypesController }