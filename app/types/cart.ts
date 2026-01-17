export interface CartItem {
  index : number
  name : string
  price : number
  quantity : number
  limit : number
}

export interface Cart {
  item : CartItem[]
}