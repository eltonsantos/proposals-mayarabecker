import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "../../controllers/UsersController/CreateUserController";
import { ListUsersController } from "../../controllers/UsersController/ListUsersController";
import { DeleteUserController } from "../../controllers/UsersController/DeleteUserController";
import { UpdateUserController } from "../../controllers/UsersController/UpdateUserController";
import { AuthUserController } from "../../controllers/UsersController/AuthUserController";
import { DetailUserController } from "../../controllers/UsersController/DetailUserController";
import { isAuthenticated } from "../../middleware/isAuthenticated";

export async function usersRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post("/session", async (request: FastifyRequest, reply: FastifyReply) => {
    return new AuthUserController().handle(request, reply)
  })

  fastify.get("/user", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DetailUserController().handle(request, reply)
  })
  
  fastify.post("/user", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateUserController().handle(request, reply)
  })

  fastify.get("/users", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListUsersController().handle(request, reply)
  })

  fastify.delete("/user", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteUserController().handle(request, reply)
  })

  fastify.put("/user", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateUserController().handle(request, reply)
  })
}