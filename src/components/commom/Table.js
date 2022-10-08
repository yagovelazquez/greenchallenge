import * as React from 'react'


import {
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'


function Table({columns, data}) {

  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  })
  
  const strippedFuncClass = (index) => index % 2 !== 0 ? "bg-gray-100 border-b" : "bg-white border-b"

  return (
    <div className="p-2">
      <table className='min-w-[450px] border-2 bg-gray-200 border-b-0'>
        <thead >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className='border-b-2 text-left h-[60px]'  key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="p-[10px]">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr className={`${strippedFuncClass(index)}  h-[60px]`} key={row.id}>
              {row.getVisibleCells().map((cell,index) => (
                <td key={cell.id} className={index !== 2 ? `capitalize text-left px-[10px]` : `text-left`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
}


export default Table;