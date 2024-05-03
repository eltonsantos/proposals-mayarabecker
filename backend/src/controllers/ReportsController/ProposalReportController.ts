import { FastifyRequest, FastifyReply } from "fastify"
import { ProposalReporter } from "../../helpers/reports/ProposalReporter"

class ProposalReportController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const dataFromDB = {
      proposalId: id,
      clientName: 'Cliente Mayara'
    }

    const reporter = new ProposalReporter()
    const pdf = await reporter.build(dataFromDB)
    reply.type('application/pdf')
    reply.header(
      'Content-Disposition',
      'attachment; filename=proposta.pdf'
    )
    reply.send(pdf)
  }
}

export { ProposalReportController }