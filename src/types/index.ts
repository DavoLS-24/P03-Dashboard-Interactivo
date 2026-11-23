export type Region = 'West' | 'East' | 'Central' | 'South'

export interface Filters {
  year: number | 'all'
  region: Region | 'all'
}   

export interface FilterOptions {
  years: number[]
  regions: Region[]
}

export interface Transaction {
  rowId: number
  orderId: string
  orderDate: string        
  shipDate: string         
  shipMode: string
  customerId: string
  customerName: string
  segment: string
  country: string
  city: string
  state: string
  postalCode: string | null   
  region: Region
  productId: string
  category: string
  subCategory: string
  productName: string
  sales: number
}

export interface Kpi {
  title: string
  value: number
  variation: number
  description: string
  format: 'currency' | 'number'
}