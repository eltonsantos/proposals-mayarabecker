"use client";

import { FormEvent, useState, useEffect } from 'react';
import { api } from '@/services/apiClient';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'react-toastify';
import * as Yup from "yup";

interface ServiceCreate {
  name: string;
  description: string;
  value: number;
  numberInstallment: number;
  serviceType: string;
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

const createServiceSchema = Yup.object({
  name: Yup.string().required("Nome não pode ficar em branco"),
  description: Yup.string().required("Descrição não pode ficar em branco"),
  serviceType: Yup.string().required("Selecione o tipo de serviço"),
});

export function ServiceDialogCreate({ onServiceCreated }: { onServiceCreated: () => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState(0)
  const [numberInstallment, setNumberInstallment] = useState(0)
  const [services, setServices] = useState<ServiceCreate[]>([])
  const [serviceType, setServiceType] = useState<string | undefined>(undefined);
  const [servicesTypes, setServicesTypes] = useState<ServiceType[]>([]);
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);

  useEffect(() => {
    async function loadServicesTypes() {
      try {
        const response = await api.get('/servicesTypes');
        setServicesTypes(response.data);
      } catch (error) {
        console.error('Erro ao carregar tipos de serviços:', error);
      }
    }

    loadServicesTypes();
  }, []);

  function handleOpenNewServiceModal() {
    setIsNewServiceModalOpen(true);
  }

  async function handleCreateNewService(e: FormEvent) {
    e.preventDefault();
    await createServiceSchema.validate({
      name,
      description,
      serviceType
    })
      .then(() => {
        createService({
          name,
          description,
          value,
          numberInstallment,
          serviceType
        });

        setName("")
        setDescription("")
        setValue(0)
        setNumberInstallment(0)
        setServiceType("")
        setIsNewServiceModalOpen(false)
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  async function createService({ name, description, value, numberInstallment, serviceType }: ServiceCreate) {
    try {
      const response = await api.post('/service', {
        name,
        description,
        value,
        numberInstallment,
        serviceTypeId: serviceType
      })

      setServices(prevServices => [...prevServices, response.data])
      toast.success("Serviço cadastrado com sucesso");
      onServiceCreated()
    } catch (error) {
      console.log(error)
      toast.error("Ocorreu um erro ao cadastrar o serviço: " + error.response.data.message);
    }
  }

  return (
    <Dialog onOpenChange={setIsNewServiceModalOpen} open={isNewServiceModalOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpenNewServiceModal} className="bg-blue-800 text-gray-100 cursor-pointer">
          Criar Serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar serviço</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateNewService}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Nome:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
              Descrição:
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-32"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="value" className="block text-gray-700 font-semibold mb-2">
              Valor:
            </label>
            <input
              type="text"
              id="value"
              name="value"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numberInstallment" className="block text-gray-700 font-semibold mb-2">
              Número de parcelas:
            </label>
            <input
              type="text"
              id="numberInstallment"
              name="numberInstallment"
              value={numberInstallment}
              onChange={(e) => setNumberInstallment(parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="serviceType" className="block text-gray-700 font-semibold mb-2">
              Tipo de Serviço:
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              multiple={false}
            >
              <option value="">Selecione um tipo de serviço</option>
              {servicesTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
            </select>
          </div>
          <Button className='w-full'>Criar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
