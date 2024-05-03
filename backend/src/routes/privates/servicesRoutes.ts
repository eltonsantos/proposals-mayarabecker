import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateServiceController } from "../../controllers/ServicesController/CreateServiceController";
import { ListServicesController } from "../../controllers/ServicesController/ListServicesController";
import { DeleteServiceController } from "../../controllers/ServicesController/DeleteServiceController";
import { UpdateServiceController } from "../../controllers/ServicesController/UpdateServiceController";
import { isAuthenticated } from "../../middleware/isAuthenticated";

export async function servicesRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post("/service", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateServiceController().handle(request, reply)
  })

  fastify.get("/services", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListServicesController().handle(request, reply)
  })

  fastify.delete("/service", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteServiceController().handle(request, reply)
  })

  fastify.put("/service", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateServiceController().handle(request, reply)
  })
}