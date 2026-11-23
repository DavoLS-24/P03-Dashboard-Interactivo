import { Box, Container, Typography } from '@mui/material'

// =====================================================================
// ESTRUCTURA DEL PROYECTO (src/)
// ---------------------------------------------------------------------
//   components/  -> un archivo .tsx por componente (export default)
//   types/       -> interfaces de TypeScript compartidas
//   data/        -> datos de ejemplo
//   App.tsx      -> este archivo (solo lo modifica la PERSONA A)
//
// REGLAS DEL EQUIPO
//   1. Cada persona modifica SOLO sus archivos.
//   2. B y C pueden poner sus componentes aquí para probarlos en su
//      computadora, pero NO suben los cambios de App.tsx.
//   3. Una rama por persona; se unen a main con Pull Request.
//      Orden: primero B y C, al final A.
// =====================================================================

// =====================================================================
// PERSONA A: Estructura, estado y diseño responsivo
// ---------------------------------------------------------------------
// [ ] src/types/   -> interfaces compartidas: Filters, FilterOptions,
//                     Transaction, etc.
// [ ] src/data/    -> datos de ejemplo: valores de los KPIs, lista de
//                     pedidos, años y regiones disponibles.
// [ ] useState de los filtros, por ejemplo:
//       const [filters, setFilters] = useState<Filters>({ year: 'all', region: 'all' })
//     y mostrar en pantalla que el valor cambia (por ejemplo, en el subtítulo).
// [ ] isMobile con useMediaQuery de MUI (pantallas menores a 768 px).
// [ ] Organizar la pantalla con Grid de MUI:
//       Escritorio: KPIs en fila, serie temporal a la izquierda,
//                   barras y dona a la derecha, tabla abajo.
//       Móvil:      todo en una sola columna; Ventas Totales a todo el ancho.
// [ ] Reemplazar cada Box provisional de abajo por el componente real
//     cuando B y C lo hayan subido.
// [ ] Tema oscuro en src/main.tsx.
// =====================================================================

// =====================================================================
// PERSONA B: Parte superior (src/components/)
// ---------------------------------------------------------------------
// [ ] Header.tsx    -> props: title (string), subtitle (string)
// [ ] FilterBar.tsx -> props: filters (Filters), options (FilterOptions),
//                      onFilterChange (función)
//                      Selectores de Año y Región con Select de MUI.
// [ ] KpiCard.tsx   -> props: title (string), value (number),
//                      variation (number), description (string),
//                      featured (boolean, opcional: ocupa todo el ancho en móvil)
// =====================================================================

// =====================================================================
// PERSONA C: Parte inferior (src/components/)
// ---------------------------------------------------------------------
// [ ] ChartCard.tsx         -> props: title (string), subtitle (string),
//                              children (ReactNode)
//                              Por ahora, children puede ser un texto
//                              "Gráfico próximamente".
// [ ] TransactionsTable.tsx -> props: columns (arreglo), rows (Transaction[]),
//                              pageSize (number)  [versión escritorio]
// [ ] TransactionCard.tsx   -> props: transaction (Transaction)  [versión móvil]
// [ ] Pagination.tsx        -> props: currentPage (number), totalItems (number),
//                              onPageChange (función), compact (boolean, opcional)
// =====================================================================

// Caja provisional para marcar dónde irá cada componente.
// PERSONA A: borrarla cuando todos los componentes reales estén listos.
function Placeholder({ label }: { label: string }) {
  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        color: 'text.secondary',
      }}
    >
      {label}
    </Box>
  )
}

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="overline" color="text.secondary">
        Base del proyecto: cada caja se reemplaza por su componente
      </Typography>

      {/* ---------- PERSONA B ---------- */}
      <Placeholder label="1. Header (Persona B)" />
      <Placeholder label="2. FilterBar: Año y Región (Persona B)" />
      <Placeholder label="3. KpiCard ×3: Ventas Totales, Cantidad de Pedidos, Ticket Promedio (Persona B)" />

      {/* ---------- PERSONA C ---------- */}
      <Placeholder label="4. ChartCard: Serie Temporal de Ventas Mensuales (Persona C)" />
      <Placeholder label="4. ChartCard: Ventas por Subcategoría (Persona C)" />
      <Placeholder label="4. ChartCard: Porcentaje de Ventas por Estado (Persona C)" />
      <Placeholder label="8. TransactionsTable / 10. TransactionCard en móvil (Persona C)" />
      <Placeholder label="9. Pagination (Persona C)" />
    </Container>
  )
}

export default App
