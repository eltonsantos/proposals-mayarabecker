"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { api } from "@/services/apiClient";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

interface Service {
  id: string;
  name: string;
  description: string;
  value: string;
  numberInstallment: number;
  serviceType?: ServiceType;
  serviceTypeId?: string
}

interface ServiceType {
  id: string;
  name: string;
  tax: string;
  observation: string;
  createdAt?: string;
  updatedAt?: string;
}

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export function CheckServices() {

  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    loadServices()
  }, []);

  async function loadServices() {
    const response = await api.get('/services');
    setServices(response.data); 
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const selected = data.items || [];
    const selectedServiceNames = services.filter((service) => selected.includes(service.id)).map((service) => service.name);
    // Função que gera proposta aqui
    alert(`Você marcou: ${selectedServiceNames.join(", ")}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              {services.map((service) => (
                <FormField
                  key={service.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={service.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(service.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, service.id])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== service.id
                                  )
                                )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <p>
                                  {service.name}
                                </p>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                <p>
                                  {service.description}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>     
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Gerar Proposta</Button>
      </form>
    </Form>
  )
}
