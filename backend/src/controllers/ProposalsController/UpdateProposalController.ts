import { FastifyRequest, FastifyReply } from "fastify"
import { UpdateProposalService } from "../../services/ProposalsServices/UpdateProposalService"

class UpdateProposalController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const { title, description, discount, numberInstallment, customer, serviceIDs } = request.body as { title: string, description: string, discount: number, numberInstallment: number, customer: string, serviceIDs: string[] }

    const proposalService = new UpdateProposalService()
    
    const proposal = await proposalService.execute({ id, title, description, discount, numberInstallment, customer, serviceIDs })

    reply.send(proposal)   
  }
}

export { UpdateProposalController }