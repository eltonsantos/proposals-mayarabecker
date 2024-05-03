"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { ServiceTypeDialogCreate } from "@/components/ServiceTypeDialog/ServiceTypeDialogCreate";
import { ServiceTypeDialogUpdate } from "@/components/ServiceTypeDialog/ServiceTypeDialogUpdate";
import { api } from "@/services/apiClient";

interface ServiceTypeUpdate {
  id: string;
  name: string;
  tax: string;
  complement: string;
  observation: string;
}

export default function ServicesTypes() {

  const [servicesTypes, setServicesTypes] = useState<ServiceTypeUpdate[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServicesTypes()
  }, []);

  async function loadServicesTypes() {
    const response = await api.get('/servicesTypes');
    setServicesTypes(response.data); 
  }

  async function removeServiceType(id: string) {
    try {
      await api.delete("/serviceType", {
        params: {
          id
        }
      })

      const allServicesTypes = servicesTypes.filter((serviceType) => serviceType.id !== id)

      setServicesTypes(allServicesTypes)

      toast.success('Tipo de serviço removido com sucesso.');

    } catch (error) {
      console.error('Erro ao remover tipo de serviço:', error);
      toast.error('Erro ao remover tipo de serviço.');
    }
  }

  return (
    <>
      <div className="flex justify-start items-center gap-3">
        <p className="text-gray-700 text-3xl mb-5 mt-5 font-bold">Página de Tipos de serviços</p>
        <ServiceTypeDialogCreate onServiceTypeCreated={loadServicesTypes} />
      </div>

      <div className="grid col-1 bg-white h-96 shadow-sm">
        <Table className="text-gray-700">
          <TableCaption>Lista de tipos de serviços.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Taxa</TableHead>
              <TableHead>Complemento</TableHead>
              <TableHead>Observação</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicesTypes.length ? servicesTypes.map(serviceType => {
              return (
                <TableRow key={serviceType.id}>
                  <TableCell className="font-medium">{serviceType.id}</TableCell>
                  <TableCell>{serviceType.name}</TableCell>
                  <TableCell>{serviceType.tax}</TableCell>
                  <TableCell>{serviceType.complement}</TableCell>
                  <TableCell>{serviceType.observation}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-center gap-5">
                      <ServiceTypeDialogUpdate serviceType={serviceType} onServiceTypeUpdated={loadServicesTypes} />
                      <Trash2 onClick={() => removeServiceType(serviceType.id)} className="text-red-600 cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              )
            }) : <TableRow><TableCell colSpan={4}>Não há tipos de serviços cadastrados</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
