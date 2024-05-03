import { LogOut, ChevronDown, AlignJustify, Crown, User2 } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";

interface TopbarProps {
  showNav: boolean;
  setShowNav: (showNav: boolean) => void;
}

export function Topbar({ showNav, setShowNav }: TopbarProps) {
  
  const { signOut, user } = useContext(AuthContext)

  return (
    <div
      className={`fixed w-full h-16 flex justify-between bg-white items-center transition-all duration-[400ms] ${showNav ? "pl-56" : ""
        }`}
    >
      <div className="pl-4 md:pl-16">
        <AlignJustify
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              {user && user.role === 'admin' && <Crown className="h-10 w-10 ml-2 text-yellow-500 mr-1" />}
              <Avatar className="rounded-full h-10 md:mr-4 border-2 border-white shadow-sm">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback>
                  <User2 />
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block font-medium text-gray-700">
                { user?.name }
              </span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-700" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                {/* <Menu.Item>
                    <Link
                      href="/users/${id}"
                      className="flex hover:bg-blue-900 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Menu.Item> */}
                <Menu.Item>
                  <Link
                    href="#"
                    onClick={signOut}
                    className="flex hover:bg-blue-900 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}