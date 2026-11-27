import { useEffect, useState } from 'react'
import { obtenerVentas } from '../services/ventasService'
import type { Transaction } from '../types'

// Consulta los registros a Firebase al cargar el componente y
// guarda los datos, el estado de carga y el posible error.
export default function useFetchData() {
  const [data, setData] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Evita actualizar el estado si el componente se desmonta antes de terminar
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
  }, []) // [] = la consulta se ejecuta una sola vez, al cargar

  return { data, loading, error }
}
