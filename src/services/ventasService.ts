import { get, ref } from 'firebase/database'
import { database } from '../firebase/firebase'
import type { Region, Transaction } from '../types'

// Ruta de los registros dentro de la base de datos.
// '/' = la raíz, porque output.json se importó directamente.
// Si los registros estuvieran dentro de un nodo (por ejemplo "ventas"), cambiar a 'ventas'.
const DATA_PATH = '/'

// Forma de cada registro tal como está guardado en Firebase (claves de output.json)
interface RegistroFirebase {
  'Row ID': number
  'Order ID': string
  'Order Date': string
  'Ship Date': string
  'Ship Mode': string
  'Customer ID': string
  'Customer Name': string
  Segment: string
  Country: string
  City: string
  State: string
  'Postal Code': string | null
  Region: Region
  'Product ID': string
  Category: string
  'Sub-Category': string
  'Product Name': string
  Sales: number
}

// Convierte las claves de Firebase ("Order ID") al formato del proyecto (orderId)
function toTransaction(r: RegistroFirebase): Transaction {
  return {
    rowId: r['Row ID'],
    orderId: r['Order ID'],
    orderDate: r['Order Date'],
    shipDate: r['Ship Date'],
    shipMode: r['Ship Mode'],
    customerId: r['Customer ID'],
    customerName: r['Customer Name'],
    segment: r.Segment,
    country: r.Country,
    city: r.City,
    state: r.State,
    postalCode: r['Postal Code'] ?? null,
    region: r.Region,
    productId: r['Product ID'],
    category: r.Category,
    subCategory: r['Sub-Category'],
    productName: r['Product Name'],
    sales: r.Sales,
  }
}

// Lee una sola vez todos los registros de ventas desde Realtime Database
export async function obtenerVentas(): Promise<Transaction[]> {
  if (!database) {
    throw new Error(
      'Falta la URL de Realtime Database. Agrégala en DATABASE_URL (src/firebase/firebase.ts).',
    )
  }

  const snapshot = await get(ref(database, DATA_PATH))
  if (!snapshot.exists()) {
    return []
  }

  // Firebase devuelve un arreglo (o un objeto si las claves no son consecutivas)
  const valor = snapshot.val() as RegistroFirebase[] | Record<string, RegistroFirebase>
  return Object.values(valor)
    .filter((r): r is RegistroFirebase => r != null && typeof r === 'object' && 'Order ID' in r)
    .map(toTransaction)
}
