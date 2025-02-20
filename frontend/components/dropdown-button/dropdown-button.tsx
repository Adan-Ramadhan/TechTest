import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoIosMore } from "react-icons/io";

const DropdownButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IoIosMore />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="bg-white p-3 w-[200px] border rounded"
      >
           <DropdownMenuItem className="p-2 cursor-pointer outline-none hover:bg-gray-100 rounded">
                Detail
              </DropdownMenuItem>
              <Link href="/update-product">
                <DropdownMenuItem className="p-2 cursor-pointer outline-none hover:bg-gray-100 rounded">
                  Update
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="p-2 cursor-pointer outline-none hover:bg-gray-100 rounded">
                Delete
              </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownButton;
