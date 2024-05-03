import { prismaClient } from "../../lib/prisma"

class ListUsersService {
  async execute() {
    const users = await prismaClient.user.findMany()
    return users
  }
}

export { ListUsersService }