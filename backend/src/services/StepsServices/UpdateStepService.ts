import { prismaClient } from "../../lib/prisma"

interface UpdateStepProps {
  id: string
  title: string;
  description: string;
  order: number;
  visible: boolean;
}

class UpdateStepService {
  async execute({ id, title, description, order, visible }: UpdateStepProps) {
    
    if (!id) {
      throw new Error("Solicitação inválida")
    }

    const findStep = await prismaClient.step.findFirst({
      where: {
        id
      }
    })

    if (!findStep) {
      throw new Error("Etapa não existe")
    }

    const updatedStep = await prismaClient.step.update({
      where: {
        id: findStep.id
      },
      data: {
        title,
        description,
        order,
        visible,
        updatedAt: new Date()
      }
    })

    return updatedStep
    
  }
}

export { UpdateStepService }