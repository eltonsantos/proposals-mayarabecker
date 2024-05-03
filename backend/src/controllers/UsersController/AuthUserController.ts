import { FastifyRequest, FastifyReply } from "fastify"
import { AuthUserService } from "../../services/UsersServices/AuthUserService"

class AuthUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as { email: string, password: string }

    const authUserService = new AuthUserService()

    const auth = await authUserService.execute({ email, password })

    reply.send(auth)
  }
}

export { AuthUserController }