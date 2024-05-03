import { prismaClient } from "../../lib/prisma"

interface DeleteServiceTypeProps {
  id: string
}

class DeleteServiceTypeService {
  async execute({ id }: DeleteServiceTypeProps) {

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

    await prismaClient.serviceType.delete({
      where: {
        id: findServiceType.id
      }
    })

    return { message: "Tipo de serviço deletado com sucesso!" }
    
  }
}

export { DeleteServiceTypeService }