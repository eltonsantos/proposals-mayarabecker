import { prismaClient } from "../../lib/prisma"

interface UpdateUserProps {
  id: string
  name: string
  email: string
  password: string
  role: string
}

class UpdateUserService {
  async execute({ id, name, email, password, role }: UpdateUserProps) {
    
    if (!id) {
      throw new Error("Solicitação inválida")
    }

    const findUser = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    if (!findUser) {
      throw new Error("Usuário não existe")
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id: findUser.id
      },
      data: {
        name,
        email,
        password,
        role,
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return updatedUser
    
  }
}

export { UpdateUserService }