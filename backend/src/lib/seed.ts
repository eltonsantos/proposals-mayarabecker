const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

async function clearDatabase() {
  try {
    console.log("Limpando coleções anteriores...")
    await prismaClient.user.deleteMany({});
    await prismaClient.serviceType.deleteMany({});
    await prismaClient.service.deleteMany({});
    await prismaClient.proposal.deleteMany({});
    console.log('Coleções anteriores limpas com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar as coleções:', error);
  } finally {
    await prismaClient.$disconnect();
  }
}

async function seedDatabase() {

  try {

    await clearDatabase();

    console.log('Populando as coleções...');

    // Seeding dos usuários
    const hashedAdminPassword = await bcrypt.hash('12345678', 10);
    const hashedManagerPassword = await bcrypt.hash('12345678', 10);

    await prismaClient.user.createMany({
      data: [
        {
          name: 'Admin User',
          email: 'admin@admin.com',
          password: hashedAdminPassword,
          role: 'admin',
        },
        {
          name: 'Manager User',
          email: 'manager@manager.com',
          password: hashedManagerPassword,
          role: 'manager',
        },
      ],
    });

    // Seeding dos tipos de serviços
    await prismaClient.serviceType.createMany({
      data: [
        {
          name: 'Tipo de Serviço 1',
          tax: "10",
          complement: '+ 5% impostos',
          observation: 'Observação do Tipo 1',
        },
        {
          name: 'Tipo de Serviço 2',
          tax: "15",
          complement: '+ € 63,52',
          observation: 'Observação do Tipo 2',
        },
        // Adicione quantos tipos de serviço desejar
      ],
    });

    // Seeding dos serviços
    const serviceTypes = await prismaClient.serviceType.findMany();
    const serviceTypeIds = serviceTypes.map(type => type.id);

    await prismaClient.service.createMany({
      data: [
        {
          name: 'Serviço 1',
          description: 'Descrição do Serviço 1',
          value: faker.number.int(900),
          numberInstallment: faker.number.int(5),
          serviceTypeId: serviceTypeIds[0]
        },
        {
          name: 'Serviço 2',
          description: 'Descrição do Serviço 2',
          value: faker.number.int(900),
          numberInstallment: faker.number.int(5),
          serviceTypeId: serviceTypeIds[1]
        },
        {
          name: 'Serviço 3',
          description: 'Descrição do Serviço 3',
          value: faker.number.int(900),
          numberInstallment: faker.number.int(5),
          serviceTypeId: serviceTypeIds[0]
        },
        {
          name: 'Serviço 4',
          description: 'Descrição do Serviço 4',
          value: faker.number.int(900),
          numberInstallment: faker.number.int(5),
          serviceTypeId: serviceTypeIds[0]
        },
      ],
    });

    // Seeding das propostas
    const services = await prismaClient.service.findMany();
    const serviceIds = services.map(type => type.id);

    await prismaClient.proposal.createMany({
      data: [
        {
          title: 'Proposal 1',
          description: 'Descrição da proposta 2',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 2',
          description: 'Descrição da proposta 2',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 3',
          description: 'Descrição da proposta 3',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 4',
          description: 'Descrição da proposta 4',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 5',
          description: 'Descrição da proposta 5',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 6',
          description: 'Descrição da proposta 6',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 7',
          description: 'Descrição da proposta 7',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 8',
          description: 'Descrição da proposta 8',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 9',
          description: 'Descrição da proposta 9',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 10',
          description: 'Descrição da proposta 10',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 11',
          description: 'Descrição da proposta 11',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 12',
          description: 'Descrição da proposta 12',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 13',
          description: 'Descrição da proposta 13',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        },
        {
          title: 'Proposal 14',
          description: 'Descrição da proposta 14',
          discount: faker.number.int(30),
          numberInstallment: faker.number.int(5),
          createdAt: faker.date.past()
        }
      ]
    });

    console.log('Seed concluído!');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  } finally {
    await prismaClient.$disconnect();
  }
}

seedDatabase();
