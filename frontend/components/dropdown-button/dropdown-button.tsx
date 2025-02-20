import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoIosMore } from "react-icons/io";
import axios from "axios";


type Props = {
    id: number;
  };


const DropdownButton = ({id}: Props) => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  const handleDelete = async (id: number) => {
    try {

        console.log("id di ambil", id)
      await axios.delete(`${base_url}/product/${id}`);

      alert("Product berhasil dihapus");
    } catch (err) {
      console.log(err);
    }
  };

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
          <button onClick={() => handleDelete(id)}>Delete</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownButton;
