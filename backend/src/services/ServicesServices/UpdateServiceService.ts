import { prismaClient } from "../../lib/prisma"

interface UpdateServiceProps {
  id: string
  name: string;
  description: string;
  value: number;
  numberInstallment: number;
  serviceTypeId: string;
}

class UpdateServiceService {
  async execute({ id, name, description, value, numberInstallment, serviceTypeId }: UpdateServiceProps) {
    
    if (!id) {
      throw new Error("Solicitação inválida")
    }

    const findService = await prismaClient.service.findFirst({
      where: {
        id
      }
    })

    if (!findService) {
      throw new Error("Serviço não existe")
    }

    const updatedService = await prismaClient.service.update({
      where: {
        id: findService.id
      },
      data: {
        name,
        description,
        value,
        numberInstallment,
        serviceTypeId,
        updatedAt: new Date()
      }
    })

    return updatedService
    
  }
}

export { UpdateServiceService }