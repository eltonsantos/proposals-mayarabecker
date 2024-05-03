import { FastifyRequest, FastifyReply } from "fastify"
import { CreateUserService } from "../../services/UsersServices/CreateUserService"

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, role } = request.body as { name: string, email: string, password: string, role: string }

    const userService = new CreateUserService()

    const user = await userService.execute({ name, email, password, role })

    reply.send(user)
  }
}

export { CreateUserController }