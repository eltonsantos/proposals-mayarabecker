import { prismaClient } from "../../lib/prisma"

interface UpdateServiceTypeProps {
  id: string
  name: string
  observation: string
  tax: string
  complement: string
}

class UpdateServiceTypeService {
  async execute({ id, name, observation, tax, complement }: UpdateServiceTypeProps) {
    
    if (!id) {
      throw new Error("Solicitação inválida")
    }

    const findServiceType = await prismaClient.serviceType.findFirst({
      where: {
        id
      }
    })

    if (!findServiceType) {
      throw new Error("Tipo de serviço não existe")
    }

    const updatedServiceType = await prismaClient.serviceType.update({
      where: {
        id: findServiceType.id
      },
      data: {
        name,
        observation,
        tax,
        complement,
        updatedAt: new Date()
      }
    })

    return updatedServiceType
    
  }
}

export { UpdateServiceTypeService }