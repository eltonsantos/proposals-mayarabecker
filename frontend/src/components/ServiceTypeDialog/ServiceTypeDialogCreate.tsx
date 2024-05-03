"use client";

import { FormEvent, useState } from 'react';
import { api } from '@/services/apiClient';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'react-toastify';
import * as Yup from "yup";

interface ServiceTypeCreate {
  name: string;
  tax: string;
  complement: string;
  observation: string;
}

const createServiceTypeSchema = Yup.object({
  name: Yup.string().required("Nome não pode ficar em branco")
});

export function ServiceTypeDialogCreate({ onServiceTypeCreated }: { onServiceTypeCreated: () => void }) {
  const [servicesTypes, setServicesTypes] = useState<ServiceTypeCreate[]>([])
  const [name, setName] = useState('')
  const [tax, setTax] = useState('')
  const [complement, setComplement] = useState('')
  const [observation, setObservation] = useState('')
  const [isNewServiceTypeModalOpen, setIsNewServiceTypeModalOpen] = useState(false);

  function handleOpenNewServiceTypeModal() {
    setIsNewServiceTypeModalOpen(true);
  }

  async function handleCreateNewServiceType(e: FormEvent) {
    e.preventDefault();
    await createServiceTypeSchema.validate({
      name,
    })
      .then(() => {
        createServiceType({
          name,
          tax,
          complement,
          observation,
        });

        setName("")
        setTax("")
        setComplement("")
        setObservation("")
        setIsNewServiceTypeModalOpen(false)
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  async function createServiceType({ name, tax, complement, observation }: ServiceTypeCreate) {
    try {

      const response = await api.post('/serviceType', {
        name,
        tax,
        complement,
        observation
      })

      setServicesTypes(prevServicesTypes => [...prevServicesTypes, response.data])
      toast.success("Tipo de serviço cadastrado com sucesso");
      onServiceTypeCreated()
    } catch (error) {
      console.log(error)
      toast.error("Ocorreu um erro ao cadastrar o Tipo de serviço: " + error.response.data.message);
    }
  }

  return (
    <Dialog onOpenChange={setIsNewServiceTypeModalOpen} open={isNewServiceTypeModalOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpenNewServiceTypeModal} className="bg-blue-800 text-gray-100 cursor-pointer">
          Criar Tipo de Serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Tipo de serviço</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateNewServiceType}>
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
          <Button className='w-full'>Criar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
