import React, { forwardRef, useContext } from 'react';
import { User2, Home, ScrollText, Folders, FileCode2, Waypoints } from "lucide-react";
import Link from "next/link";
import Image from "next/image"
import logoImg from "../../public/logoImg.png"
import { AuthContext } from '@/contexts/AuthContext';

interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
  showNav: boolean;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {

  const { user } = useContext(AuthContext)
  const isAdmin = user?.role === 'admin'

  return (
    <div ref={ref} className="fixed w-60 h-full bg-gray-200 shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <Image src={logoImg} alt="Logo Mayara Becker" priority={true} />
        </picture>
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors text-blue-900 hover:bg-gray-100 hover:text-purple-500`}
          >
            <div className="mr-2">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </Link>
        <Link href="/proposals">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors text-blue-900 hover:bg-gray-100 hover:text-purple-500`}
          >
            <div className="mr-2">
              <FileCode2 className="h-5 w-5" />
            </div>
            <div>
              <p>Gerar Propostas</p>
            </div>
          </div>
        </Link>

        {isAdmin && (
          <>
            <Link href="/services">
              <div
                className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors text-blue-900 hover:bg-gray-100 hover:text-purple-500`}
              >
                <div className="mr-2">
                  <ScrollText className="h-5 w-5" />
                </div>
                <div>
                  <p>Serviços</p>
                </div>
              </div>
            </Link>
            <Link href="/steps">
              <div
                className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors text-blue-900 hover:bg-gray-100 hover:text-purple-500`}
              >
                <div className="mr-2">
                  <Waypoints className="h-5 w-5" />
                </div>
                <div>
                  <p>Etapas</p>
                </div>
              </div>
            </Link>
            <Link href="/services-types">
              <div
                className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors text-blue-900 hover:bg-gray-100 hover:text-purple-500`}
              >
                <div className="mr-2">
                  <Folders className="h-5 w-5" />
                </div>
                <div>
                  <p>Tipos de Serviços</p>
                </div>
              </div>
            </Link>
            <Link href="/users">
              <div
                className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors text-blue-900 hover:bg-gray-100 hover:text-purple-500`}
              >
                <div className="mr-2">
                  <User2 className="h-5 w-5" />
                </div>
                <div>
                  <p>Usuários</p>
                </div>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  )
});

Sidebar.displayName = "SideBar";

export default Sidebar;