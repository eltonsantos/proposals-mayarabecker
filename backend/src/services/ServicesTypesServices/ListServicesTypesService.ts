import { prismaClient } from "../../lib/prisma"

class ListServicesTypesService {
  async execute() {
    const servicesTypes = await prismaClient.serviceType.findMany()
    return servicesTypes
  }
}

export { ListServicesTypesService }