import AdminSidebar from "@/components/sidebar/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

const AdminLayout: React.FC<{children: ReactNode}> = ({children}) => {
    return(
        <SidebarProvider>
            <AdminSidebar/>
            <div className="w-full">
                {children}
            </div>
        </SidebarProvider>
    )
}

export default AdminLayout;