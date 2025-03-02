import { useEffect } from "react";
import useStore from "./store";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import { TQuestion } from "../../types";

const columnHelper = createColumnHelper<TQuestion>()
const columns = [
  columnHelper.accessor("questionContent",{
    id: "questionContent",
    header: "Question"
  }),
  columnHelper.accessor("answerA",{
    id: "ansA",
    header: "Answer A"
  }),
  columnHelper.accessor("answerB",{
    id: "ansB",
    header: "Answer B"
  }),
  columnHelper.accessor("answerC",{
    id: "ansC",
    header: "Answer C"
  }),
  columnHelper.accessor("answerD",{
    id: "ansD",
    header: "Answer D"
  }),
  columnHelper.accessor("rightAnswer",{
    id: "rightAns",
    header: "Right answer"
  })
]

const QuestionTable = () => {
  const {questions,fetchAllQuestions} = useStore((state)=>state)

  const table = useReactTable({data:questions,columns,getCoreRowModel:getCoreRowModel()})

  useEffect(()=>{
    fetchAllQuestions()
  },[])
  return ( 
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
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
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
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
    </div>
   );
}
 
export default QuestionTable;