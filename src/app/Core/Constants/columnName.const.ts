import { ColumnField } from "../Models/product.model";

export const listProductColumnNames:ColumnField[] = [
  {
    name:'ID',
    value:'id'
  },
  {
    name:'Product',
    value:'product',
    custom:true
  },
  {
    name:'Brand',
    value:'brand'
  },
  {
    name:'Category',
    value:'category',
  },
  {
    name:'Stock',
    value:'countInStock',
    custom: true
  },
  {
    name:'Price',
    value:'price',
    custom: true
  },
  {
    name:'Rating',
    value:'rating',
    custom: true
  },

];
export const listOrderColumnNames:ColumnField[] = [
  {
    name:'ID',
    value:'id'
  },
  {
    name:'User ID',
    value:'userId',
  },
  {
    name:'Amount',
    value:'totalPrice',
    custom:true
  },
  {
    name:'Address',
    value:'address',
  },
  {
    name:'Contact',
    value:'contact'
  },
  {
    name:'Date',
    value:'createdAt',
    custom: true
  },
  {
    name:'Paided',
    value:'isPaid',
    custom: true
  },
  {
    name:'Status',
    value:'status'
  },

];
export const listUserColumnNames:ColumnField[] = [
  {
    name:'ID',
    value:'id'
  },
  {
    name:'User',
    value:'username',
    custom: true
  },
  {
    name:'Role',
    value:'role',
    custom: true
  },
  {
    name:'Registered',
    value:'createdAt',
    custom:true
  },
  {
    name:'Contact',
    value:'contact',
  },
  {
    name:'Status',
    value:'isActive',
    custom:true
  },
  {
    name:'Verify Email',
    value:'isEmailVerified',
    custom: true
  },
  {
    name:'Verify Contact',
    value:'isContactVerified',
    custom: true
  }

];
export const listOrderItemsColumnNames:ColumnField[] = [
  {
    name:'ID',
    value:'id'
  },
  {
    name:'Item Info',
    value:'itemInfo',
    custom: true
  },
  {
    name:'Price',
    value:'price',
    custom: true
  },
  {
    name:'Quantity',
    value:'quantity'
  },
  {
    name:'Total',
    value:'total',
    custom: true
  }
]
export const listMyOrderColumnNames:ColumnField[] = [
  {
    name:'ID',
    value:'id'
  },
  {
    name:'Date',
    value:'createdAt',
    custom: true
  },
  {
    name:'Paided',
    value:'isPaid',
    custom: true
  },
  {
    name:'Status',
    value:'status'
  },
  {
    name:'Amount',
    value:'totalPrice',
    custom:true
  },

];
