import { List, useTable } from "@refinedev/mui";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { IProduct } from "../../interfaces";

export const ProductsList: React.FC = () => {
  const { tableQueryResult } = useTable<IProduct>({
    resource: "products",
    filters: {
      {
        permanent: [{ field: "deleted_at", operator: "eq", value: null }],
      },
    },
  });

  const { data } = tableQueryResult;

  return (
    <List>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Identificador</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </List>
  );
};