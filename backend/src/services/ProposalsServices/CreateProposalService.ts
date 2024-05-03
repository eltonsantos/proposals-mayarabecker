import { prismaClient } from "../../lib/prisma"

interface CreateProposalProps {
  title: string
  description: string
  discount: number
  numberInstallment: number;
  customer: string;
  serviceIDs?: string[];
}

class CreateProposalService {
  async execute({ title, description, discount, numberInstallment, customer, serviceIDs }: CreateProposalProps) {
    if (!title || !description || !serviceIDs) {
      throw new Error("Título e descrição devem ser preenchidos!")
    }

    const proposal = await prismaClient.proposal.create({
      data: {
        title,
        description,
        discount,
        numberInstallment,
        customer,
        serviceIDs
      }
    })
    
    return proposal
  }
}

export { CreateProposalService }