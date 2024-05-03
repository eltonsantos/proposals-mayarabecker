"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { StepDialogCreate } from "@/components/StepDialog/StepDialogCreate";
import { StepDialogUpdate } from "@/components/StepDialog/StepDialogUpdate";
import { api } from "@/services/apiClient";

interface Step {
  id: string;
  title: string;
  description: string;
  order: number;
  visible: boolean;
}

export default function Steps() {

  const [steps, setSteps] = useState<Step[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSteps()
  }, []);

  async function loadSteps() {
    const response = await api.get('/steps');
    setSteps(response.data);
  }

  async function removeStep(id: string) {
    try {
      await api.delete("/step", {
        params: {
          id
        }
      })

      const allSteps = steps.filter((step) => step.id !== id)

      setSteps(allSteps)

      toast.success('Etapa removida com sucesso.');

    } catch (error) {
      console.error('Erro ao remover etapa:', error);
      toast.error('Erro ao remover etapa.');
    }
  }

  return (
    <>
      <div className="flex justify-start items-center gap-3">
        <p className="text-gray-700 text-3xl mb-5 mt-5 font-bold">Página de Etapas</p>
        <StepDialogCreate onStepCreated={loadSteps} />
      </div>

      <div className="grid col-1 bg-white h-96 shadow-sm">
        <Table className="text-gray-700">
          <TableCaption>Lista de etapas.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              {/* <TableHead>Ordem</TableHead> */}
              <TableHead>Visível?</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {steps.length ? steps.map(step => {
              return (
                <TableRow key={step.id}>
                  <TableCell className="font-medium">{step.id}</TableCell>
                  <TableCell>{step.title}</TableCell>
                  <TableCell>{step.description}</TableCell>
                  {/* <TableCell>{step.order}</TableCell> */}
                  <TableCell>
                    {step.visible ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-center gap-5">
                      <StepDialogUpdate step={step} onStepUpdated={loadSteps} />
                      <Trash2 onClick={() => removeStep(step.id)} className="text-red-600 cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              )
            }) : <TableRow><TableCell colSpan={4}>Não há etapas cadastradas</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
