import { api } from '@/services/apiClient';
import React, { useEffect, useState } from 'react';

type Step = {
  idDragNDrop: number;
  id: string;
  title: string;
  description: string;
  order: number;
  visible: boolean;
};

function StepItem({ step, id, index, currentIndex, setCurrentIndex, setSteps, steps }: {
  step: Step;
  id: string;
  index: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  steps: Step[];
}) {

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setCurrentIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const draggedIndex = currentIndex;
    const droppedIndex = index;
    setCurrentIndex(-1);

    const updatedSteps = Array.from(steps);
    const draggedStep = updatedSteps[draggedIndex];
    updatedSteps.splice(draggedIndex, 1);
    updatedSteps.splice(droppedIndex, 0, draggedStep);

    updatedSteps.forEach((step, index) => {
      step.order = index + 1
    });

    setSteps(updatedSteps);

    const movedStep = updatedSteps[droppedIndex]

    await api.put(`/step?id=${movedStep.id}`, { order: movedStep.order });
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`p-4 border-4 border-dashed border-blue-500 bg-blue-200 rounded-md mb-2 ${
        currentIndex === index ? 'bg-purple-100' : ''
      } w-full`}
    >
      <h1>{step.title}</h1>
      <p>{step.description}</p>
      {/* <small>Ordem: {step.order}</small> */}
    </div>
  );
}

export function CheckSteps() {
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    loadSteps()
  }, []);

  async function loadSteps() {
    const response = await api.get('/steps');
    setSteps(response.data.filter((step: Step) => step.visible).sort((a: Step, b: Step) => a.order - b.order));
  }

  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  return (
    <div className="flex flex-col items-center w-full">
      {steps.map((step, index) => (
        <StepItem
          key={step.id}
          id={step.id}
          step={step}
          index={index}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setSteps={setSteps}
          steps={steps}
        />
      ))}
    </div>
  );
}

export default CheckSteps;