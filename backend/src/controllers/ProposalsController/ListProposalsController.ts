import { FastifyRequest, FastifyReply } from "fastify"
import { ListProposalsService } from "../../services/ProposalsServices/ListProposalsService"

class ListProposalsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listProposalsService = new ListProposalsService()

    const proposals = await listProposalsService.execute()

    reply.send(proposals)    
  }
}

export { ListProposalsController }