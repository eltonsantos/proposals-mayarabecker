import { prismaClient } from "../../lib/prisma"

interface DeleteProposalProps {
  id: string
}

class DeleteProposalService {
  async execute({ id }: DeleteProposalProps) {

    if (!id) {
      throw new Error("Solicitação inválida")
    }

    const findProposal = await prismaClient.proposal.findFirst({
      where: {
        id
      }
    })

    if (!findProposal) {
      throw new Error("Proposta não existe")
    }

    await prismaClient.proposal.delete({
      where: {
        id: findProposal.id
      }
    })

    return { message: "Proposta deletada com sucesso!" }
    
  }
}

export { DeleteProposalService }