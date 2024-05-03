import { FastifyRequest, FastifyReply } from "fastify"
import { DeleteProposalService } from "../../services/ProposalsServices/DeleteProposalService"

class DeleteProposalController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const proposalService = new DeleteProposalService()

    const proposal = await proposalService.execute({ id })

    reply.send(proposal)    
  }
}

export { DeleteProposalController }