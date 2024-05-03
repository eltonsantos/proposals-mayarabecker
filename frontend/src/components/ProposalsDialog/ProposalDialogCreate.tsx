"use client";

import { FormEvent, useState, useEffect, useRef } from 'react';
import { api } from '@/services/apiClient';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import * as Yup from "yup";

interface ProposalCreate {
  title: string;
  description: string;
  discount: number;
  numberInstallment: number;
  customer: string;
  serviceIDs: string[];
}

interface Service {
  id: string;
  name: string;
  description: string;
  value: number;
  numberInstallment: number;
  serviceType: string;
}

const createProposalSchema = Yup.object({
  title: Yup.string().required("Título não pode ficar em branco"),
  description: Yup.string().required("Descrição não pode ficar em branco"),
  serviceIDs: Yup.array().min(1, "Selecione pelo menos um serviço"),
}).defined();

export default function ProposalDialogCreate({ onProposalCreated }: { onProposalCreated: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [discount, setDiscount] = useState(0)
  const [numberInstallment, setNumberInstallment] = useState(0)
  const [customer, setCustomer] = useState('')
  const [services, setServices] = useState<Service[]>([])
  const [serviceIDs, setServiceIDs] = useState<string[]>([]);
  const [proposals, setProposals] = useState<ProposalCreate[]>([])
  const [isNewProposalModalOpen, setIsNewProposalModalOpen] = useState(false);
  const [selectedServiceIDs, setSelectedServiceIDs] = useState<string[]>([])
  const [selectedServicesNames, setSelectedServicesNames] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await api.get('/services');
        setServices(response.data);
      } catch (error) {
        console.error('Erro ao carregar serviços:', error);
      }
    }

    loadServices();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // const handleSelectAllServices = () => {
  //   const allServiceIds = services.map(service => service.id);
  //   setSelectedServiceIDs(allServiceIds);
  //   setSelectedServicesNames(services.map(service => service.name));
  // };

  function handleOpenNewProposalModal() {
    setIsNewProposalModalOpen(true);
  }

  async function handleCreateNewProposal(e: FormEvent) {
    e.preventDefault();
    await createProposalSchema.validate({
      title,
      description,
      serviceIDs: selectedServiceIDs, 
    })
      .then(() => {
        createProposal({
          title,
          description,
          discount,
          numberInstallment,
          customer,
          serviceIDs: selectedServiceIDs
        });

        setTitle("")
        setDescription("")
        setDiscount(0)
        setNumberInstallment(0)
        setCustomer("")
        setServiceIDs([])
        setIsNewProposalModalOpen(false)
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  async function createProposal({ title, description, discount, numberInstallment, customer, serviceIDs }: ProposalCreate) {
    try {
      const response = await api.post('/proposal', {
        title,
        description,
        discount,
        numberInstallment,
        customer,
        serviceIDs
      })

      setProposals(prevProposals => [...prevProposals, response.data])
      toast.success("Proposta cadastrada com sucesso");
      onProposalCreated()
    } catch (error) {
      console.log(error)
      toast.error("Ocorreu um erro ao cadastrar a proposta: " + error.response.data.message);
    }
  }

  return (
    <Dialog onOpenChange={setIsNewProposalModalOpen} open={isNewProposalModalOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleOpenNewProposalModal} className="bg-blue-800 text-gray-100 cursor-pointer">
                Criar Proposta
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Botão temporário. As propostas serão geradas através do botão Gerar Proposta ao escolher pelo menos um serviço
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>


      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Proposta</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateNewProposal}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
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
          <div className="mb-4">
            <label htmlFor="value" className="block text-gray-700 font-semibold mb-2">
              Desconto:
            </label>
            <input
              type="text"
              id="discount"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(parseInt(e.target.value))}
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
            <label htmlFor="customer" className="block text-gray-700 font-semibold mb-2">
              Cliente:
            </label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-4 relative" ref={dropdownRef}>
            <label htmlFor="services" className="block text-gray-700 font-semibold mb-2">
              Serviços:
            </label>
            <div className="relative">
              <div
                className="flex items-center justify-between w-full px-3 py-2 border rounded-lg cursor-pointer focus:outline-none focus:ring focus:border-blue-400"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="flex flex-wrap items-center">
                  {selectedServicesNames.length > 0 ? (
                    selectedServicesNames.map((serviceName, index) => (
                      <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 flex items-center  mb-2 sm:max-w-[150px] lg:max-w-[200px]">
                        <span className="mr-2">{serviceName}</span>
                        <button
                          className="h-full w-4 flex items-center justify-center outline-none"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.preventDefault();
                            const serviceIdToRemove = selectedServiceIDs[index];
                            const updatedSelectedServiceIDs = selectedServiceIDs.filter(id => id !== serviceIdToRemove);
                            const updatedSelectedServicesNames = selectedServicesNames.filter(name => name !== serviceName);
                            setSelectedServiceIDs(updatedSelectedServiceIDs);
                            setSelectedServicesNames(updatedSelectedServicesNames);
                          }}
                        >
                          <X />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span>Selecione um ou mais serviços</span>
                  )}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-2 ${dropdownOpen ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {dropdownOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
                  {services.map((type) => (
                    <label key={type.id} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        value={type.id}
                        onChange={(e) => {
                          const selectedServiceId = e.target.value;
                          const isSelected = selectedServiceIDs.includes(selectedServiceId);
                          if (isSelected) {
                            setSelectedServiceIDs(prevSelected => prevSelected.filter(id => id !== selectedServiceId));
                            setSelectedServicesNames(prevNames => prevNames.filter(name => name !== type.name));
                          } else {
                            setSelectedServiceIDs(prevSelected => [...prevSelected, selectedServiceId]);
                            setSelectedServicesNames(prevNames => [...prevNames, type.name]);
                          }
                        }}
                        checked={selectedServiceIDs.includes(type.id)}
                        className="form-checkbox h-4 w-4 text-blue-500 cursor-pointer"
                      />
                      <span className="ml-2">{type.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Button className='w-full'>Criar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}