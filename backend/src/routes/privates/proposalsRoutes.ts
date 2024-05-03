import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateProposalController } from "../../controllers/ProposalsController/CreateProposalController";
import { ListProposalsController } from "../../controllers/ProposalsController/ListProposalsController";
import { DeleteProposalController } from "../../controllers/ProposalsController/DeleteProposalController";
import { UpdateProposalController } from "../../controllers/ProposalsController/UpdateProposalController";
import { isAuthenticated } from "../../middleware/isAuthenticated";

export async function proposalsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post("/proposal", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateProposalController().handle(request, reply)
  })

  fastify.get("/proposals", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListProposalsController().handle(request, reply)
  })

  fastify.delete("/proposal", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteProposalController().handle(request, reply)
  })

  fastify.put("/proposal", { preHandler: isAuthenticated }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateProposalController().handle(request, reply)
  })
}