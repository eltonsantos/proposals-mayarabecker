import { FastifyRequest, FastifyReply } from "fastify"
import { UpdateStepService } from "../../services/StepsServices/UpdateStepService"

class UpdateStepController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const { title, description, order, visible } = request.body as { title: string, description: string, order: number, visible: boolean }

    const stepService = new UpdateStepService()
    
    const step = await stepService.execute({ id, title, description, order, visible })

    reply.send(step)   
  }
}

export { UpdateStepController }