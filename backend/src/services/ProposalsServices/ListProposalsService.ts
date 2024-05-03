import { prismaClient } from "../../lib/prisma"

class ListProposalsService {
  async execute() {
    const proposals = await prismaClient.proposal.findMany({
      include: {
        services: true
      }
    })
    return proposals
  }
}

export { ListProposalsService }