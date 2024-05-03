import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = Fastify({ logger: true })

const isProduction = process.env.NODE_ENV === "production";
const port = isProduction ? parseInt(process.env.PORT || "3333") : 3333;

console.log(isProduction)

// let allowedOrigin = ""

// if (isProduction) {
//   allowedOrigin = "https://proposals-mayarabecker.vercel.app"
// } else {
//   allowedOrigin = "http://localhost:3000"
// }

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message })
})

app.register(cors, {
  origin: '*',
  allowedHeaders: '*',
  methods: '*'
})

app.register(routes)

app.listen({
  port,
}).then(() => console.log(`HTTP server running on port ${port}!`));
