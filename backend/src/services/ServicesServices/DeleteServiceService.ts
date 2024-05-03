import { prismaClient } from "../../lib/prisma"

interface DeleteServiceProps {
  id: string
}

class DeleteServiceService {
  async execute({ id }: DeleteServiceProps) {

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

    await prismaClient.service.delete({
      where: {
        id: findService.id
      }
    })

    return { message: "Serviço deletado com sucesso!" }
    
  }
}

export { DeleteServiceService }