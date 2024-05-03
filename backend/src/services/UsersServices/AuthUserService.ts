import { compare } from "bcryptjs";
import { prismaClient } from "../../lib/prisma";
import { sign } from "jsonwebtoken";

interface AuthUserRequest {
  email: string
  password: string
}

class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    if (!email || !password) {
      throw new Error("Email e/ou senha devem ser preenchidos!")
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new Error("Usuário ou senha incorreta")
    }

    const passwordMath = await compare(password, user.password)

    if(!passwordMath) {
      throw new Error("Usuário ou senha incorreta")
    }

    const token = sign(
      { 
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      { subject: user.id,
        expiresIn: '30d'
      }
    )

    await prismaClient.user.update({
      where: {
        id: user.id
      },
      data: {
        lastLogin: new Date()
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      lastLogin: new Date(),
      token
    }

  }
}

export { AuthUserService }