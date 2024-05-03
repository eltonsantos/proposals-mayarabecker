"use client";

import { useState, useEffect, Fragment } from "react"
import { Transition } from "@headlessui/react"
import { Topbar } from "@/components/Topbar"
import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {

  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Topbar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Sidebar showNav={showNav} />
      </Transition>
      <div className={showNav && !isMobile ? "pl-56" : ""}>
        <div className="px-4 md:px-16">
          <main className={`pt-16 transition-all duration-[400ms]`}>
            { children }
          </main>
        </div>
      </div>
    </>
  )
}
