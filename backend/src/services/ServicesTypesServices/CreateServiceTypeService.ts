import { prismaClient } from "../../lib/prisma"

interface CreateServiceTypeProps {
  name: string
  observation: string
  tax: string
  complement: string
}

class CreateServiceTypeService {
  async execute({ name, observation, tax, complement }: CreateServiceTypeProps) {
    if (!name) {
      throw new Error("Preencha todos os campos!")
    }

    const serviceType = await prismaClient.serviceType.create({
      data: {
        name,
        observation,
        tax,
        complement
      }
    })
    
    return serviceType
  }
}

export { CreateServiceTypeService }