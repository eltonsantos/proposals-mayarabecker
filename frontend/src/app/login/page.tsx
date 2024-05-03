"use client"

import { FormEvent, useState, useContext } from "react"
import { ButtonLogin } from "@/components/ButtonLogin"
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/AuthContext"
import { toast } from "react-toastify";

export default function Login() {

  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (email === '' || password === '') {
      toast.warning('Preencha os dados para acessar o sistema')
      return
    }

    setLoading(true)

    let data = {
      email,
      password
    }
    await signIn(data)

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-20 shadow-lg rounded-lg">
        <h2 className="text-2xl text-gray-800 font-semibold mb-10 flex justify-center items-center">Sistema de Propostas</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-mail</label>
            <Input
              type="email"
              id="email"
              placeholder="Seu e-mail"
              className="w-full"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Senha</label>
            <Input
              type="password"
              id="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              required
            />
          </div>

          <ButtonLogin className="w-full mt-2 bg-blue-900" loading={loading}>
            Entrar
          </ButtonLogin>

          {error && <span className="form-field error">E-mail e/ou senha incorretos.</span>}
        </form>
      </div>
    </div>
  )
}