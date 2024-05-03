import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateStepController } from "../../controllers/StepsController/CreateStepController";
import { ListStepsController } from "../../controllers/StepsController/ListStepsController";
import { DeleteStepController } from "../../controllers/StepsController/DeleteStepController";
import { UpdateStepController } from "../../controllers/StepsController/UpdateStepController";
import { isAuthenticated } from "../../middleware/isAuthenticated";

export async function stepsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post("/step", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateStepController().handle(request, reply)
  })

  fastify.get("/steps", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListStepsController().handle(request, reply)
  })

  fastify.delete("/step", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteStepController().handle(request, reply)
  })

  fastify.put("/step", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateStepController().handle(request, reply)
  })
}