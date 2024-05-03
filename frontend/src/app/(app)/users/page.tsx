"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { UserDialogCreate } from "@/components/UserDialog/UserDialogCreate";
import { UserDialogUpdate } from "@/components/UserDialog/UserDialogUpdate";
import { api } from "@/services/apiClient";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

// type UserInput = Omit<User, "id" | "createdAt">;

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const response = await api.get('/users');
    setUsers(response.data); 
  }

  async function removeUser(id: string) {
    try {
      await api.delete("/user", {
        params: {
          id
        }
      })

      const allUsers = users.filter((user) => user.id !== id)

      setUsers(allUsers)

      toast.success('Usuário removido com sucesso.');

    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      toast.error('Erro ao remover usuário.');
    }
  }

  return (
    <>
      <div className="flex justify-start items-center gap-3">
        <p className="text-gray-700 text-3xl mb-5 mt-5 font-bold">Página de Usuários</p>
        <UserDialogCreate onUserCreated={loadUsers} />
      </div>

      <div className="grid col-1 bg-white h-96 shadow-sm">
        <Table className="text-gray-700">
          <TableCaption>Lista de usuários.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">ID</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>  
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length ? users.map((user: User) => {
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <Badge>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-center gap-5"> 
                      <UserDialogUpdate user={user} onUserUpdated={loadUsers} />
                      <Trash2 onClick={() => removeUser(user.id)} className="text-red-600 cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              )
            }) : <TableRow><TableCell colSpan={5}>Não há usuários cadastrados</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
