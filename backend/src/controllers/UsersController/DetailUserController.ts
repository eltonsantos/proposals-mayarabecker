import { FastifyRequest, FastifyReply } from "fastify"
import { DetailUserService } from "../../services/UsersServices/DetailUserService"

class DetailUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }
    // const { id } = request.params as {id: string}

    const userService = new DetailUserService()

    const user = await userService.execute({ id })

    reply.send(user)
  }
}

export { DetailUserController }