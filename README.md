# P03 - Dashboard Interactivo
 
 
**Grupo 11:** Kevin Morales, Víctor Villacis y Leiner Saltos.
 
## Descripción del proyecto
 
El proyecto consiste en desarrollar un **dashboard interactivo de ventas** que permita consultar y analizar la información comercial de una tienda: cómo varían las ventas con el tiempo, qué categorías de productos generan más ingresos, qué regiones y estados venden más y qué segmentos de clientes compran más.
 
Los datos se transformarán a formato JSON, se almacenarán en **Firebase** y desde allí serán consumidos por el dashboard, que tendrá versión de escritorio y versión móvil.
 
## Fuente de datos
 
- **Dataset:** Superstore Sales Dataset (Kaggle)
- **Enlace:** https://www.kaggle.com/datasets/rohitsahoo/sales-forecasting
- **Archivo usado:** `train.csv` (9,800 registros y 18 columnas, con órdenes de 2015 a 2018 en Estados Unidos)

Se eligió porque reúne ventas de cuatro años, con fechas, tipos de cliente, categorías de producto, ubicación y monto de venta, que son las variables necesarias para construir indicadores y gráficos.



### Variables
 
| Tipo | Variables |
|------|-----------|
| Temporales | `Order Date`, `Ship Date` |
| Numéricas | `Row ID`, `Sales` |
| Categóricas | `Order ID`, `Ship Mode`, `Customer ID`, `Customer Name`, `Segment`, `Country`, `City`, `State`, `Postal Code`, `Region`, `Product ID`, `Category`, `Sub-Category`, `Product Name` |
 

## Diseño del dashboard
 
El prototipo está hecho en Figma: [ver boceto](https://www.figma.com/design/Rp8DgmYaWmyGTobg2DqfLo/Boceto-Figma?node-id=0-1&t=NvLixnxZ3vkNXULP-1)
 
**Indicadores (KPI)**
- Ventas totales
- Cantidad de pedidos
- Ticket promedio por pedido (ventas totales / cantidad de pedidos)

**Gráficos**
- Barras: ventas por subcategoría
- Serie temporal: ventas mensuales
- Pastel/dona: porcentaje de ventas por estado

**Tabla**
- Transacciones: pedido, fecha, cliente, estado, producto y monto

**Filtros**
- Año
- Región (West, East, Central, South)

Al aplicar un filtro se actualizan los KPIs, los gráficos y la tabla. En la versión móvil el contenido va en una sola columna y la tabla se muestra como tarjetas.

## Estructura del repositorio
 
```
P03-Dashboard-Interactivo/
├── README.md
└── sprint1-datos/
    ├── converter.py    # Script de transformación CSV → JSON
    ├── train.csv       # Dataset original
    └── output.json     # Dataset transformado (generado por el script)
```
 


## Sprint 1: Transformación de datos CSV a JSON
 
### Procedimiento de transformación
 
El script `converter.py` hace lo siguiente:
 
1. **Lectura:** abre `train.csv` (UTF-8) con `csv.DictReader`, que entrega cada fila como un diccionario.
2. **Limpieza de espacios:** quita los espacios al inicio y al final de los nombres de columna y colapsa los espacios repetidos dentro de los valores. Las celdas vacías pasan a `null`.
3. **Conversión de tipos:**
   - `Row ID` → entero y `Sales` → decimal.
   - `Order Date` y `Ship Date` pasan de `dd/mm/yyyy` a `yyyy-mm-dd`.
   - Las variables categóricas se mantienen como texto.
   - `Postal Code` se mantiene como texto y se completa con ceros a la izquierda hasta 5 dígitos (por ejemplo `6824` → `"06824"`), porque el CSV había perdido el cero inicial.
4. **Escritura:** guarda todos los registros en `output.json` (indentación de 2 espacios, conservando tildes y caracteres especiales).
5. Imprime en consola cuántos registros se convirtieron.
### Validación del JSON generado
 
| Verificación | Resultado |
|--------------|-----------|
| Cantidad de registros (CSV vs JSON) | 9,800 en ambos |
| `Row ID` únicos | 9,800 |
| `Row ID` y `Sales` | Todos numéricos |
| Fechas | Todas en formato `yyyy-mm-dd`; ninguna fecha de envío es anterior a la de la orden |
| Suma de `Sales` (CSV vs JSON) | 2,261,536.78 en ambos |
| Espacios sobrantes | 251 valores corregidos |
| Valores faltantes | 11 registros sin `Postal Code` (todos de Burlington, Vermont), guardados como `null` |
 
### Ejemplo de registro
 
```json
{
  "Row ID": 1,
  "Order ID": "CA-2017-152156",
  "Order Date": "2017-11-08",
  "Ship Date": "2017-11-11",
  "Ship Mode": "Second Class",
  "Customer ID": "CG-12520",
  "Customer Name": "Claire Gute",
  "Segment": "Consumer",
  "Country": "United States",
  "City": "Henderson",
  "State": "Kentucky",
  "Postal Code": "42420",
  "Region": "South",
  "Product ID": "FUR-BO-10001798",
  "Category": "Furniture",
  "Sub-Category": "Bookcases",
  "Product Name": "Bush Somerset Collection Bookcase",
  "Sales": 261.96
}
```
 
### Cómo ejecutar
 
Requisitos: Python 3.8 o superior. No necesita instalar librerías (solo usa `csv`, `json` y `datetime`).
 
```bash
git clone https://github.com/DavoLS-24/P03-Dashboard-Interactivo.git
cd P03-Dashboard-Interactivo
python converter.py
```
 
`train.csv` debe estar en la misma carpeta que el script. Al terminar se genera `output.json` y se muestra:
 
```
Convertidos 9800 registros a output.json
```
 