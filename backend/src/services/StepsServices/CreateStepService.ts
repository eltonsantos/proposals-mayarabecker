import { prismaClient } from "../../lib/prisma"

interface CreateStepProps {
  title: string;
  description: string;
  order: number;
  visible: boolean;
}

class CreateStepService {
  async execute({ title, description, order, visible }: CreateStepProps) {
    if (!title || !description) {
      throw new Error("Preencha todos os campos!")
    }

    const step = await prismaClient.step.create({
      data: {
        title,
        description,
        order,
        visible
      }
    })
    
    return step
  }
}

export { CreateStepService }