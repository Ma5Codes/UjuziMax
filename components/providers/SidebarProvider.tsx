"use client";

import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
type SidebarContextType = {
    isOpen:boolean;
    toggle:()=>void;
    close:()=>void;
}
const SidebarContext = createContext<SidebarContextType|undefined>(undefined)

export const SidebarProvider = ({children}:{children: ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = ()=>setIsOpen(!isOpen);
    const close = ()=>setIsOpen(false)
  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
};
export const useSidebar=()=>{
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a sidebar Provider")
    }
    return context;
}
