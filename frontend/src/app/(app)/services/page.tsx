"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { ServiceDialogCreate } from "@/components/ServiceDialog/ServiceDialogCreate";
import { ServiceDialogUpdate } from "@/components/ServiceDialog/ServiceDialogUpdate";
import { api } from "@/services/apiClient";

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
  tax: number;
  complement: string;
  observation: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Services() {

  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices()
  }, []);

  async function loadServices() {
    const response = await api.get('/services');
    setServices(response.data); 
  }

  async function removeService(id: string) {
    try {
      await api.delete("/service", {
        params: {
          id
        }
      })

      const allServices = services.filter((service) => service.id !== id)

      setServices(allServices)

      toast.success('Serviço removido com sucesso.');

    } catch (error) {
      console.error('Erro ao remover serviço:', error);
      toast.error('Erro ao remover serviço.');
    }
  }

  return (
    <>
      <div className="flex justify-start items-center gap-3">
        <p className="text-gray-700 text-3xl mb-5 mt-5 font-bold">Página de Serviços</p>
        <ServiceDialogCreate onServiceCreated={loadServices} />
      </div>

      <div className="grid col-1 bg-white h-96 shadow-sm">
        <Table className="text-gray-700">
          <TableCaption>Lista de serviços.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Nº de parcelas</TableHead>
              <TableHead>Tipo de serviço</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow> 
          </TableHeader>
          <TableBody>
            {services.length ? services.map(service => {
              return (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.id}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'EUR'
                    }).format(service.value)}
                  </TableCell>
                  <TableCell>{service.numberInstallment}</TableCell>
                  <TableCell>{service.serviceType.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-center gap-5">
                      <ServiceDialogUpdate service={service} onServiceUpdated={loadServices} />
                      <Trash2 onClick={() => removeService(service.id)} className="text-red-600 cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              )
            }) : <TableRow><TableCell colSpan={4}>Não há serviços cadastrados</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
