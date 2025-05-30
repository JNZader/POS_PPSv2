import { List, EditButton, ShowButton } from "@refinedev/mui";
import { useTable } from "@refinedev/core";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { IOrder } from "../../interfaces";

export const OrdersList: React.FC = () => {
  const { tableQueryResult } = useTable<IOrder>({
    resource: "orders",
    filters: {
      permanent: [{ field: "deleted_at", operator: "eq", value: null }],
    },
  });

  const { data } = tableQueryResult;

  return (
    <List>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.customer_id}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.total_amount}</TableCell>
              <TableCell>
                <EditButton recordItemId={row.id} />
                <ShowButton recordItemId={row.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </List>
  );
};