"use client";

import { FormEvent, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import { api } from '@/services/apiClient';
import * as Yup from "yup";

interface ServiceUpdate {
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
  services?: ServiceUpdate
}

interface ServiceUpdateProps {
  service: ServiceUpdate
  onServiceUpdated: () => void
}

const updateServiceSchema = Yup.object({
  name: Yup.string().required("Nome não pode ficar em branco"),
  description: Yup.string().required("Descrição não pode ficar em branco"),
  serviceType: Yup.string().required("Selecione o tipo de serviço"),
});

export function ServiceDialogUpdate({ service, onServiceUpdated }: ServiceUpdateProps) {

  const [id, setId] = useState('');
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState(0)
  const [numberInstallment, setNumberInstallment] = useState(0)
  const [services, setServices] = useState<ServiceUpdate[]>([])
  const [serviceType, setServiceType] = useState<string | undefined>(undefined);
  const [servicesTypes, setServicesTypes] = useState<ServiceType[]>([]);
  const [isUpdateServiceModalOpen, setIsUpdateServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceUpdate>();
  const [serviceTypeId, setServiceTypeId] = useState<string | undefined>(undefined);
  const [selectedServiceType, setSelectedServiceType] = useState<string | undefined>(undefined);


  useEffect(() => {
    if (editingService?.id) {
      setId(editingService.id);
    }
    if (editingService?.name) {
      setName(editingService.name);
    }
    if (editingService?.description) {
      setDescription(editingService.description);
    }
    if (editingService?.value) {
      setValue(editingService.value);
    }
    if (editingService?.numberInstallment) {
      setNumberInstallment(editingService.numberInstallment);
    }
    if (editingService?.serviceType) {
      setServiceType(editingService.serviceType.id);
    }
  }, [editingService]);

  useEffect(() => {

    async function loadServicesTypes() {
      try {
        const response = await api.get<ServiceType[]>('/servicesTypes');
        setServicesTypes(response.data);
      } catch (error) {
        console.error('Erro ao carregar tipos de serviços:', error);
      }
    }

    loadServicesTypes();
  }, []);

  function handleOpenUpdateServiceModal(service: ServiceUpdate) {
    setEditingService(service);
    setIsUpdateServiceModalOpen(true)
  }

  function updateServiceType(value: string) {
    setServiceTypeId(value)
  }

  async function handleUpdateService(e: FormEvent) {
    e.preventDefault();
    await updateServiceSchema.validate({
        name,
        description,
        serviceTypeId
      })
      .then(() => {
        updateService({
          id,
          name,
          description,
          value,
          numberInstallment,
          serviceTypeId: selectedServiceType || serviceTypeId
        });

        setIsUpdateServiceModalOpen(false)

      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  async function updateService({ id, name, description, value, numberInstallment, serviceTypeId }: ServiceUpdate) {
    try {
      const response = await api.put(`/service?id=${id}`, {
        name,
        description,
        value,
        numberInstallment,
        serviceTypeId
      })

      setServices(prevServices => [...prevServices, response.data])
    
      onServiceUpdated()
      toast.success("Serviço atualizado com sucesso");
    } catch (error) {
      console.log(error)
      toast.error("Ocorreu um erro ao atualizar o serviço: " + error);
    }
  }

  return (
    <Dialog onOpenChange={setIsUpdateServiceModalOpen} open={isUpdateServiceModalOpen}>
      <DialogTrigger asChild>
        <Edit onClick={() => handleOpenUpdateServiceModal(service)} className="text-blue-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar serviço</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdateService}>
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
              value={selectedServiceType || serviceType || ''}
              onChange={(e) => setSelectedServiceType(e.target.value)}
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
          <Button className='w-full'>Atualizar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}