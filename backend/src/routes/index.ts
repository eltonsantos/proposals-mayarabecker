import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { usersRoutes } from "./privates/usersRoutes";
import { servicesRoutes } from "./privates/servicesRoutes";
import { servicesTypesRoutes } from "./privates/servicesTypesRoutes";
import { proposalsRoutes } from "./privates/proposalsRoutes";
import { reportsRoutes } from "./privates/reportsRouters";
import { stepsRoutes } from "./privates/stepsRoutes";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  await usersRoutes(fastify, options)
  await servicesRoutes(fastify, options)
  await stepsRoutes(fastify, options)
  await servicesTypesRoutes(fastify, options)
  await proposalsRoutes(fastify, options)
  await reportsRoutes(fastify, options)
} 