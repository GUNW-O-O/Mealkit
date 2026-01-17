export interface Product {
  index : number
  name : string
  price : string
  current : number
  limit : number
  image : string | null
}

export interface RegProduct {
  index : number
  name : string
  price : number
  current : number
  limit : number
  image : string | null
}

export interface ProductResponse {
  status : number
  content : Product[]
}