import { FastifyRequest, FastifyReply } from "fastify"
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string
}

export function isAuthenticated(request: FastifyRequest, reply: FastifyReply, next: () => void) {
  const authToken = request.headers.authorization

  if(!authToken) {
    return reply.status(401).send()
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token,
      process.env.JWT_SECRET
    ) as Payload;

    next();

  } catch (err) {
    reply.status(401).send();
  }

}