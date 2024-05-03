import { prismaClient } from "../../lib/prisma"

class ListStepsService {
  async execute() {
    const steps = await prismaClient.step.findMany()
    return steps
  }
}

export { ListStepsService }