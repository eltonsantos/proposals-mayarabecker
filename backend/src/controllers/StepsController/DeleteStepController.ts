import { FastifyRequest, FastifyReply } from "fastify"
import { DeleteStepService } from "../../services/StepsServices/DeleteStepService"

class DeleteStepController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const stepService = new DeleteStepService()

    const step = await stepService.execute({ id })

    reply.send(step)    
  }
}

export { DeleteStepController }