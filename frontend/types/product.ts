import TWithId from "./with-id"

export type TProduct = {
    name: string,
    price: number,
    createdAt?: string,
    image: string,
    categoryId: number,
}


export type TProductWithId = TProduct & TWithId