import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

type Show = {
  id: string;
  name: string;
  type: string;
  language: string;
  summary: string;
};

const ProjectInfo: React.FC = () => {
  const [data, setData] = React.useState<Show[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.tvmaze.com/search/shows?q=snow"
      );

      const data = await response.json();
      const shows = data.map((show: { show: Show }) => show.show);

      setData(shows);
    })();
  }, []);

  const columns = React.useMemo<ColumnDef<Show>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "language",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "summary",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default ProjectInfo;
