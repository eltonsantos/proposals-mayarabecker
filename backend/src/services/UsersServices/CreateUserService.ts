import { hash } from "bcryptjs"
import { prismaClient } from "../../lib/prisma"

interface CreateUserProps {
  name: string
  email: string
  password: string
  role: string
}

class CreateUserService {
  async execute({ name, email, password, role }: CreateUserProps) {
    if (!name || !email || !password || !role) {
      throw new Error("Preencha todos os campos!")
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (userAlreadyExists) {
      throw new Error("Usuário já existe")
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })
    
    return user
  }
}

export { CreateUserService }