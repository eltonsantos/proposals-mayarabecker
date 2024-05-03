import { prismaClient } from "../../lib/prisma"

interface DetailUserProps {
  id: string
}

class DetailUserService {
  async execute({ id }: DetailUserProps) {

    if (!id) {
      throw new Error("Solicitação inválida")
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      throw new Error("Usuário não existe")
    }

    return user
    
  }
}

export { DetailUserService }