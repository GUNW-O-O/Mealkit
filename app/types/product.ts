export interface Product {
  index : number
  name : string
  price : string
  current : number
  limit : number
  image : string | null
}

export interface ProductResponse {
  status : number
  content : Product[]
}