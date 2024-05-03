import { prismaClient } from "../../lib/prisma"

interface UpdateProposalProps {
  id: string
  title: string
  description: string
  discount: number
  numberInstallment: number
  customer: string
  serviceIDs?: string[]
}

class UpdateProposalService {
  async execute({ id, title, description, discount, numberInstallment, customer, serviceIDs }: UpdateProposalProps) {
    
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

    const updatedProposal = await prismaClient.proposal.update({
      where: {
        id: findProposal.id
      },
      data: {
        title,
        description,
        discount,
        numberInstallment,
        customer,
        serviceIDs,
        updatedAt: new Date()
      }
    })

    return updatedProposal
    
  }
}

export { UpdateProposalService }