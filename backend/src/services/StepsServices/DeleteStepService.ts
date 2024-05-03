import { prismaClient } from "../../lib/prisma"

interface DeleteStepProps {
  id: string
}

class DeleteStepService {
  async execute({ id }: DeleteStepProps) {

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

    await prismaClient.step.delete({
      where: {
        id: findStep.id
      }
    })

    return { message: "Etapa deletada com sucesso!" }
    
  }
}

export { DeleteStepService }