import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import type { Database } from 'firebase/database'

export const DATABASE_URL = 'https://project-data-4f094-default-rtdb.firebaseio.com'

// No es secreta: el acceso lo controlan las reglas de la base de datos
const firebaseConfig = {
  apiKey: 'AIzaSyD_HM_CmtdY4gH7gZhBTAZ-w0Ek9uVNT90',
  authDomain: 'project-data-4f094.firebaseapp.com',
  databaseURL: DATABASE_URL,
  projectId: 'project-data-4f094',
  storageBucket: 'project-data-4f094.firebasestorage.app',
  messagingSenderId: '750231017041',
  appId: '1:750231017041:web:85292c5e3dcd2a9f64ca70',
}

const app = initializeApp(firebaseConfig)

// Sin URL queda en null y el servicio muestra un error claro
export const database: Database | null = DATABASE_URL ? getDatabase(app) : null
