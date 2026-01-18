export interface CartItem {
  index : number
  name : string
  price : number
  quantity : number
  limit : number
  current : number
}

export interface Cart {
  item : CartItem[]
}