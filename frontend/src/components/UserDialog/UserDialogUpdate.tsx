"use client";

import { FormEvent, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import { api } from '@/services/apiClient';
import * as Yup from "yup";

interface UserUpdate {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UserUpdateProps {
  user: UserUpdate
  onUserUpdated: () => void
}

const updateUserSchema = Yup.object({
  email: Yup.string().required("Email não pode ficar em branco"),
  password: Yup.string().required("Senha não pode ficar em branco"),
});

export function UserDialogUpdate({ user, onUserUpdated }: UserUpdateProps) {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [role, setRole] = useState('');
  const [users, setUsers] = useState<UserUpdate[]>([]);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserUpdate>();

  useEffect(() => {
    if (editingUser?.id) {
      setId(editingUser.id);
    }
    if (editingUser?.name) {
      setName(editingUser.name);
    }
    if (editingUser?.email) {
      setEmail(editingUser.email);
    }
    if (editingUser?.password) {
      setPassword(editingUser.password);
    }
    if (editingUser?.role) {
      setPassword(editingUser.role);
    }
  }, [editingUser]);

  function handleOpenUpdateUserModal(user: UserUpdate) {
    setEditingUser(user)
    // setRole(user.role)
    setIsUpdateUserModalOpen(true)
  }

  async function handleUpdateUser(e: FormEvent) {
    e.preventDefault();

    await updateUserSchema
      .validate({
        name,
        email,
        password,
        role,
      })
      .then(() => {
        updateUser({
          id,
          name,
          email,
          password,
          role,
        });

        setIsUpdateUserModalOpen(false)

      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  async function updateUser({ id, name, email, password, role }: UserUpdate) {
    try {
      const response = await api.put(`/user?id=${id}`, {
        name,
        email,
        password,
        role
      })

      setUsers(prevUsers => [...prevUsers, response.data])
      onUserUpdated()
      toast.success("Usuário atualizado com sucesso");
    } catch (error) {
      console.log(error)
      toast.error("Ocorreu um erro ao atualizar o usuário: " + error);
    }
  }

  return (
    <Dialog open={isUpdateUserModalOpen} onOpenChange={setIsUpdateUserModalOpen}>
      <DialogTrigger asChild>
        <Edit onClick={() => handleOpenUpdateUserModal(user)} className="text-blue-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar Usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdateUser}>
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
          {/* <div className="mb-4">
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
          </div> */}
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
          <Button className='w-full'>Atualizar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
