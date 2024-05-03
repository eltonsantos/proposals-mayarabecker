import { FastifyRequest, FastifyReply } from "fastify"
import { ListStepsService } from "../../services/StepsServices/ListStepsService"

class ListStepsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listStepsService = new ListStepsService()

    const steps = await listStepsService.execute()

    reply.send(steps)
  }
}

export { ListStepsController }