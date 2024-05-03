import { FastifyRequest, FastifyReply } from "fastify"
import { UpdateUserService } from "../../services/UsersServices/UpdateUserService"

class UpdateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const { name, email, password, role } = request.body as { name: string, email: string, password: string, role: string }

    const userService = new UpdateUserService()
    
    const user = await userService.execute({ id, name, email, password, role })

    reply.send(user)
  }
}

export { UpdateUserController }