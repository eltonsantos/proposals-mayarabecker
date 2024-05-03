import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { ProposalReportController } from "../../controllers/ReportsController/ProposalReportController";

export async function reportsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/reports/proposal", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ProposalReportController().handle(request, reply)
  })
}