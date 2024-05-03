"use client";

import { FormEvent, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import { api } from '@/services/apiClient';
import * as Yup from "yup";

interface StepUpdate {
  id: string;
  title: string;
  description: string;
  // order: number;
  visible: boolean;
}

interface StepUpdateProps {
  step: StepUpdate
  onStepUpdated: () => void
}

const updateStepSchema = Yup.object({
  title: Yup.string().required("Título não pode ficar em branco")
});

export function StepDialogUpdate({ step, onStepUpdated }: StepUpdateProps) {

  const [id, setId] = useState('');
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // const [order, setOrder] = useState(1)
  const [visible, setVisible] = useState(false)
  const [steps, setSteps] = useState<StepUpdate[]>([])
  const [isUpdateStepModalOpen, setIsUpdateStepModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<StepUpdate>();


  useEffect(() => {
    if (editingStep?.id) {
      setId(editingStep.id);
    }
    if (editingStep?.title) {
      setTitle(editingStep.title);
    }
    if (editingStep?.description) {
      setDescription(editingStep.description);
    }
    // if (editingStep?.order) {
    //   setOrder(editingStep.order);
    // }
    if (editingStep?.visible) {
      setVisible(editingStep.visible);
    }
  }, [editingStep]);

  function handleOpenUpdateStepModal(step: StepUpdate) {
    setEditingStep(step);
    setIsUpdateStepModalOpen(true)
  }

  async function handleUpdateStep(e: FormEvent) {
    e.preventDefault();
    await updateStepSchema.validate({
      title
    })
      .then(() => {
        updateStep({
          id,
          title,
          description,
          // order,
          visible
        });

        setIsUpdateStepModalOpen(false)

      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  async function updateStep({ id, title, description/*, order*/, visible }: StepUpdate) {
    try {
      const response = await api.put(`/step?id=${id}`, {
        title,
        description,
        // order,
        visible
      })

      setSteps(prevSteps => [...prevSteps, response.data])

      onStepUpdated()
      toast.success("Etapa atualizada com sucesso");
    } catch (error) {
      console.log(error)
      toast.error("Ocorreu um erro ao atualizar a etapa: " + error);
    }
  }

  return (
    <Dialog onOpenChange={setIsUpdateStepModalOpen} open={isUpdateStepModalOpen}>
      <DialogTrigger asChild>
        <Edit onClick={() => handleOpenUpdateStepModal(step)} className="text-blue-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar etapa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdateStep}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Título:
            </label>
            <input
              type="text"
              id="title"
              name="title"
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
              type="text"
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
          <Button className='w-full'>Atualizar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}