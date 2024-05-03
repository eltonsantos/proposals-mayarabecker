"use client";

import { FormEvent, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import { api } from '@/services/apiClient';
import * as Yup from "yup";

interface ServiceTypeUpdate {
  id: string;
  name: string;
  tax: string;
  complement: string;
  observation: string;
}

interface ServiceTypeUpdateProps {
  serviceType: ServiceTypeUpdate
  onServiceTypeUpdated: () => void
}

const updateServiceTypeSchema = Yup.object({
  name: Yup.string().required("Nome não pode ficar em branco")
});

export function ServiceTypeDialogUpdate({ serviceType, onServiceTypeUpdated }: ServiceTypeUpdateProps) {

  const [id, setId] = useState('');
  const [name, setName] = useState('')
  const [tax, setTax] = useState('')
  const [complement, setComplement] = useState('')
  const [observation, setObservation] = useState('')
  const [servicesTypes, setServicesTypes] = useState<ServiceTypeUpdate[]>([])
  const [isUpdateServiceTypeModalOpen, setIsUpdateServiceTypeModalOpen] = useState(false);
  const [editingServiceType, setEditingServiceType] = useState<ServiceTypeUpdate>();

  useEffect(() => {
    if (editingServiceType?.id) {
      setId(editingServiceType.id);
    }
    if (editingServiceType?.name) {
      setName(editingServiceType.name);
    }
    if (editingServiceType?.tax) {
      setTax(editingServiceType.tax);
    }
    if (editingServiceType?.complement) {
      setComplement(editingServiceType.complement);
    }
    if (editingServiceType?.observation) {
      setObservation(editingServiceType.observation);
    }
  }, [editingServiceType]);

  function handleOpenUpdateServiceTypeModal(serviceType: ServiceTypeUpdate) {
    setEditingServiceType(serviceType)
    setIsUpdateServiceTypeModalOpen(true)
  }

  async function handleUpdateServiceType(e: FormEvent) {
    e.preventDefault();

    await updateServiceTypeSchema
      .validate({
        name,
      })
      .then(() => {
        updateServiceType({
          id,
          name,
          tax,
          complement,
          observation,
        });

        setIsUpdateServiceTypeModalOpen(false)

      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  async function updateServiceType({ id, name, tax, complement, observation }: ServiceTypeUpdate) {
    try {
      const response = await api.put(`/serviceType?id=${id}`, {
        name,
        tax,
        complement,
        observation,
      })

      setServicesTypes(prevServicesTypes => [...prevServicesTypes, response.data])
      onServiceTypeUpdated()
      toast.success("Tipo de serviço atualizado com sucesso");
    } catch (error) {
      console.log(error)
      toast.error("Ocorreu um erro ao atualizar o tipo de serviço: " + error);
    }
  }

  return (
    <Dialog open={isUpdateServiceTypeModalOpen} onOpenChange={setIsUpdateServiceTypeModalOpen}>
      <DialogTrigger asChild>
        <Edit onClick={() => handleOpenUpdateServiceTypeModal(serviceType)} className="text-blue-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Tipo de serviço</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdateServiceType}>
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
            <label htmlFor="tax" className="block text-gray-700 font-semibold mb-2">
              Taxa:
            </label>
            <input
              type='text'
              id="tax"
              name="tax"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="complement" className="block text-gray-700 font-semibold mb-2">
              Complemento:
            </label>
            <input
              type='text'
              id="complement"
              name="complement"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="observation" className="block text-gray-700 font-semibold mb-2">
              Observação:
            </label>
            <textarea
              id="observation"
              name="observation"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-32"
            ></textarea>
          </div>
          <Button className='w-full'>Atualizar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
