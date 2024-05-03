import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateServiceTypeController } from "../../controllers/ServicesTypesController/CreateServiceTypeController";
import { ListServicesTypesController } from "../../controllers/ServicesTypesController/ListServicesTypesController";
import { DeleteServiceTypeController } from "../../controllers/ServicesTypesController/DeleteServiceTypeController";
import { UpdateServiceTypeController } from "../../controllers/ServicesTypesController/UpdateServiceTypeController";
import { isAuthenticated } from "../../middleware/isAuthenticated";

export async function servicesTypesRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post("/serviceType", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateServiceTypeController().handle(request, reply)
  })

  fastify.get("/servicesTypes", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListServicesTypesController().handle(request, reply)
  })

  fastify.delete("/serviceType", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteServiceTypeController().handle(request, reply)
  })

  fastify.put("/serviceType", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateServiceTypeController().handle(request, reply)
  })
}