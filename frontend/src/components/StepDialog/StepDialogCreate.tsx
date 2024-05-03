"use client";

import { FormEvent, useState } from 'react';
import { api } from '@/services/apiClient';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { Checkbox } from '../ui/checkbox';

interface StepCreate {
  title: string;
  description: string;
  order: number;
  visible: boolean;
}

const createStepSchema = Yup.object({
  title: Yup.string().required("Título não pode ficar em branco")
});

export function StepDialogCreate({ onStepCreated }: { onStepCreated: () => void }) {
  const [steps, setSteps] = useState<StepCreate[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [order, setOrder] = useState(1)
  const [visible, setVisible] = useState(false)
  const [isNewStepModalOpen, setIsNewStepModalOpen] = useState(false);

  function handleOpenNewStepModal() {
    setIsNewStepModalOpen(true);
  }

  async function handleCreateNewStep(e: FormEvent) {
    e.preventDefault();
    await createStepSchema.validate({
      title,
    })
      .then(() => {
        createStep({
          title,
          description,
          order,
          visible,
        });

        setTitle("")
        setDescription("")
        setOrder(1)
        setVisible(false)
        setIsNewStepModalOpen(false)
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  async function createStep({ title, description, order, visible }: StepCreate) {
    try {

      const response = await api.post('/step', {
        title,
        description,
        order,
        visible
      })

      setSteps(prevSteps => [...prevSteps, response.data])
      toast.success("Etapa cadastrada com sucesso");
      onStepCreated()
    } catch (error) {
      console.log(error)
      toast.error("Ocorreu um erro ao cadastrar a Etapa: " + error.response.data.message);
    }
  }

  return (
    <Dialog onOpenChange={setIsNewStepModalOpen} open={isNewStepModalOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpenNewStepModal} className="bg-blue-800 text-gray-100 cursor-pointer">
          Criar Etapa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Etapa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateNewStep}>
          <div className="mb-4">
            <label htmlFor="step" className="block text-gray-700 font-semibold mb-2">
              Título:
            </label>
            <input
              type="text"
              id="step"
              name="step"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
          {/* <div className="mb-4">
            <label htmlFor="order" className="block text-gray-700 font-semibold mb-2">
              Ordem:
            </label>
            <input
              id="order"
              name="order"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div> */}
          <div className="mb-4 flex items-center">
            <label htmlFor="visible" className="block text-gray-700 font-semibold mb-2">
              Visível?
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="visible"
                name="visible"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
                className="h-5 w-5 rounded ml-3 mb-[9px] border-gray-300 border focus:ring focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>
          </div>
          <Button className='w-full'>Criar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
