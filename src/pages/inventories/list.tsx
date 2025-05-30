import { List, useTable } from "@refinedev/mui";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { IInventory } from "../../interfaces";

export const InventoryList: React.FC = () => {
  const { tableQueryResult } = useTable<IInventory>({
    resource: "inventory",
    filters: {
      permanent: [{ field: "deleted_at", operator: "eq", value: null }],
    },
  );

  const { data } = tableQueryResult;

  return (
    <List>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Identificador</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Cantidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.product_id}</TableCell>
              <TableCell>{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </List>
  );
};