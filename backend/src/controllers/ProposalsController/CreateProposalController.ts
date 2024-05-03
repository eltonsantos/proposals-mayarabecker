import { FastifyRequest, FastifyReply } from "fastify"
import { CreateProposalService } from "../../services/ProposalsServices/CreateProposalService"

class CreateProposalController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, description, discount, numberInstallment, customer, serviceIDs } = request.body as { title: string, description: string, discount: number, numberInstallment: number, customer: string, serviceIDs: string[] }

    const proposalService = new CreateProposalService()

    const proposal = await proposalService.execute({ title, description, discount, numberInstallment, customer, serviceIDs })

    reply.send(proposal)
  }
}

export { CreateProposalController }