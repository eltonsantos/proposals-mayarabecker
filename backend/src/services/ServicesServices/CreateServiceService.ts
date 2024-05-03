import { prismaClient } from "../../lib/prisma"

interface CreateServiceProps {
  name: string;
  description: string;
  value: number;
  numberInstallment: number;
  serviceTypeId: string;
}

class CreateServiceService {
  async execute({ name, description, value, numberInstallment, serviceTypeId }: CreateServiceProps) {
    if (!name || !description) {
      throw new Error("Preencha todos os campos!")
    }

    const service = await prismaClient.service.create({
      data: {
        name,
        description,
        value,
        numberInstallment,
        serviceTypeId
      }
    })
    
    return service
  }
}

export { CreateServiceService }