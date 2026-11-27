import { useEffect, useState } from 'react'
import { obtenerVentas } from '../services/ventasService'
import type { Transaction } from '../types'

export default function useFetchData() {
  const [data, setData] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
   
    let activo = true

    async function cargarDatos() {
      try {
        const registros = await obtenerVentas()
        if (activo) setData(registros)
      } catch (e) {
        if (activo) setError(e instanceof Error ? e.message : 'No se pudieron cargar los datos.')
      } finally {
        if (activo) setLoading(false)
      }
    }

    cargarDatos()

    return () => {
      activo = false
    }
  }, []) 

  return { data, loading, error }
}
