"use client"

import { FormEvent, useState } from 'react';
import { api } from '@/services/apiClient';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'react-toastify';
import * as Yup from "yup";

interface UserCreate {
  name: string;
  email: string;
  password: string;
  role: string;
}

const createUserSchema = Yup.object({
  email: Yup.string().required("Email não pode ficar em branco"),
  password: Yup.string().required("Senha não pode ficar em branco"),
});

export function UserDialogCreate({ onUserCreated }: { onUserCreated: () => void }) {
  const [users, setUsers] = useState<UserCreate[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [role, setRole] = useState("manager");
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

  function handleOpenNewUserModal() {
    setIsNewUserModalOpen(true);
  }

  async function handleCreateNewUser(e: FormEvent) {
    e.preventDefault();
    if (password === confirmPassword) {
      setPasswordsMatch(true);
      await createUserSchema
      .validate({
        email,
        password,
        confirmPassword,
      })
      .then(() => {
        createUser({
          name,
          email,
          password,
          role: role.toLowerCase(),
        });

        setName("");
        setEmail("");
        setPassword("")
        setConfirmPassword("")
        setRole("manager");
        setIsNewUserModalOpen(false)
      })
      .catch((error) => {
        toast.error(error.message);
      });

    } else {
      setPasswordsMatch(false);
    }
  }

  async function createUser({ name, email, password, role }: UserCreate) {
    try {

      const response = await api.post('/user', {
        name,
        email,
        password,
        role
      })

      setUsers(prevUsers => [...prevUsers, response.data])
      toast.success("Usuário cadastrado com sucesso");
      onUserCreated()
    } catch (error) {
      console.log(error)
      toast.error("Ocorreu um erro ao cadastrar o usuário: " + error.response.data.message);
    }
  }

  return (
    <Dialog onOpenChange={setIsNewUserModalOpen} open={isNewUserModalOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpenNewUserModal} className="bg-blue-800 text-gray-100 cursor-pointer">
          Criar Usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateNewUser}>
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
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
              Confirmar Senha:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordsMatch(password === e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              required
            />
            {!passwordsMatch && (
              <p className="text-red-500 text-sm">As senhas não coincidem.</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
              Função:
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <Button className='w-full'>Criar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}