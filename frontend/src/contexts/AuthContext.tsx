"use client"

import { ReactNode, createContext, useEffect, useState } from "react"
import { api } from '../services/apiClient'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify"

type UserProps = {
  id: string
  name: string
  email: string
  role: string
}

type SignInProps = {
  email: string
  password: string
}

type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user
  const router = useRouter()

  console.log(user)

  useEffect(() => {
    const { '@proposalsmayarabecker.token' : token, '@proposalsmayarabecker.userId' : userId } = parseCookies()
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`
      api.get("/user?id=" + userId).then(response => {
        const { id, name, email, role } = response.data
        setUser({ id, name, email, role })
      }).catch((error) => {
        console.log(error)
        signOut()
      })
    }
  }, [])

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password
      })
      
      console.log(response)

      const { id, name, token, role } = response.data

      setCookie(undefined, '@proposalsmayarabecker.token', token, {
        maxAge: 60*60*24*30,
        path: "/"
      })

      setCookie(undefined, '@proposalsmayarabecker.userId', id, {
        maxAge: 60*60*24*30,
        path: "/"
      })

      setUser({
        id,
        name,
        email,
        role
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      router.push("/")
      
      toast.success(`Bem vindo(a), ${name}`)
    } catch (error) {
      toast.error("Erro ao fazer login: "  + error.response.data.message)
      console.log("Erro ao fazer login: ", error);
    }
  }

  async function signOut() {
    try {
      destroyCookie(undefined, '@proposalsmayarabecker.token')
      destroyCookie(undefined, '@proposalsmayarabecker.userId')
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.replace("/login")
    } catch (error) {
      toast.error("Erro ao fazer logout")
      console.log("Erro ao tentar deslogar")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  )
}