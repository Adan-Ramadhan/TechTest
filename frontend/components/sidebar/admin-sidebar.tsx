import Link from "next/link"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

const items = [
	{
		title: "Dashboard",
		url: "/admin/dashboard",
	},
	{
		title: "Product",
		url: "/admin/product",
	},
]
const AdminSidebar = () => {
    return(
        <Sidebar>
            <SidebarContent>
            <SidebarGroup>
					<SidebarGroupLabel className="pt-8 pb-5">Dashboard</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="mt-2">
							{ items.map((item) => (
								<SidebarMenuItem className="px-2" key={ item.title }>
									<SidebarMenuButton asChild>
										<Link href={ item.url } className="p-5 block">
											<span>{ item.title }</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							)) }
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AdminSidebar