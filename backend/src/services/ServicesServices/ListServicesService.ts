import { prismaClient } from "../../lib/prisma"

class ListServicesService {
  async execute() {
    const services = await prismaClient.service.findMany({
      include: {
        serviceType: true
      }
    })
    return services
  }
}

export { ListServicesService }