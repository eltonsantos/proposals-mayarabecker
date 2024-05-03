"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { CheckServices } from "@/components/CheckServices";
import { CheckSteps } from "@/components/CheckSteps";
import ProposalDialogCreate from "@/components/ProposalsDialog/ProposalDialogCreate";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { api } from "@/services/apiClient";
import { Badge } from "@/components/ui/badge";

interface Proposal {
  id: string;
  title: string;
  description: string;
  discount: number;
  numberInstallment: number;
  customer: string;
  services?: Service[];
  serviceIDs?: string[]
  createdAt?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  value: number;
  numberInstallment: number;
  serviceType?: ServiceType;
  serviceTypeId?: string
}

interface ServiceType {
  id: string;
  name: string;
  tax: string;
  complement: string;
  observation: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Proposals() {

  const [proposals, setProposals] = useState<Proposal[]>([])
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    loadProposals()
    loadServices()
  }, []);

  async function loadProposals() {
    const response = await api.get('/proposals');
    setProposals(response.data.sort((a: Proposal, b: Proposal) => {
      return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
    }));
  }

  async function loadServices() {
    const response = await api.get('/services');
    setServices(response.data);
  }

  async function removeProposal(id: string) {
    try {
      await api.delete("/proposal", {
        params: {
          id
        }
      })

      const allProposals = proposals.filter((proposal) => proposal.id !== id)

      setProposals(allProposals)

      toast.success('Proposta removida com sucesso.');

    } catch (error) {
      console.error('Erro ao remover proposta:', error);
      toast.error('Erro ao remover proposta.');
    }
  }

  return (
    <>
      <div className="grid col-1 bg-white">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl text-gray-500">Selecione os serviços</AccordionTrigger>
            <AccordionContent>
              <CheckServices />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="grid col-1 bg-white">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl text-gray-500">Selecione as etapas</AccordionTrigger>
            <AccordionContent>
              <CheckSteps />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex justify-start items-center gap-3 mt-4">
        <p className="text-gray-700 text-3xl mb-5 mt-5 font-bold">Histórico de propostas geradas</p>
        <ProposalDialogCreate onProposalCreated={loadProposals} />
      </div>

      <div className="grid col-1 bg-white shadow-sm">
        <Table className="text-gray-700">
          <TableCaption>Lista de propostas.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Desconto (%)</TableHead>
              <TableHead>Nº de parcelas</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço(s)</TableHead>
              <TableHead>Criada em</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.length ? proposals.map(proposal => {
              return (
                <TableRow key={proposal.id}>
                  <TableCell className="font-medium">{proposal.id}</TableCell>
                  <TableCell>{proposal.title}</TableCell>
                  <TableCell>{proposal.description}</TableCell>
                  <TableCell>{proposal.discount}</TableCell>
                  <TableCell>{proposal.numberInstallment}</TableCell>
                  <TableCell>{proposal.customer}</TableCell>
                  <TableCell>
                    {proposal.services && proposal.services.map((service, index) => (
                      <span key={index}>
                        <Badge>{service.name}</Badge>
                        {index !== proposal.services.length - 1 && ' '}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(proposal.createdAt)
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-center gap-5">
                      {/* <ProposalDialogUpdate proposal={proposal} onProposalUpdated={loadProposals} /> */}
                      <Trash2 onClick={() => removeProposal(proposal.id)} className="text-red-600 cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              )
            }) : <TableRow><TableCell colSpan={4}>Não há propostas cadastradas</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </>
  );
}