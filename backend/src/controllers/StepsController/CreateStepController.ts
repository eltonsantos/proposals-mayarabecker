import { FastifyRequest, FastifyReply } from "fastify"
import { CreateStepService } from "../../services/StepsServices/CreateStepService"

class CreateStepController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, description, order, visible } = request.body as { title: string, description: string, order: number, visible: boolean }

    const stepService = new CreateStepService()

    const step = await stepService.execute({ title, description, order, visible })

    reply.send(step)
  }
}

export { CreateStepController }