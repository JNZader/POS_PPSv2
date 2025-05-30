import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Box, TextField, Select, MenuItem, Button } from "@mui/material";
import { useSelect } from "@refinedev/core";
import { IOrder } from "../../interfaces";

export const OrdersCreate: React.FC = () => {
  const {
    saveButtonProps,
    register,
    watch,
  } = useForm<IOrder>();

  const { options: customerOptions } = useSelect({
    resource: "customers",
    optionLabel: "user_id",
    optionValue: "id",
    filters: [{ field: "deleted_at", operator: "eq", value: null }],
  });

  const totalAmount = watch("total_amount");

  const handleGeneratePayment = () => {
    alert(`Link de pago generado para el pedido con monto ${totalAmount || 0}`);
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Select
          {...register("customer_id")}
          label="Cliente"
          required
        >
          {customerOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          {...register("status")}
          label="Estado"
          defaultValue="pending"
          required
        >
          <MenuItem value="pending">Pendiente</MenuItem>
          <MenuItem value="in_progress">En Progreso</MenuItem>
          <MenuItem value="delivered">Entregado</MenuItem>
          <MenuItem value="canceled">Cancelado</MenuItem>
        </Select>
        <TextField
          {...register("total_amount")}
          label="Monto Total"
          type="number"
          required
        />
        <TextField
          {...register("bottles_delivered")}
          label="Bidones Entregados"
          type="number"
          defaultValue={0}
        />
        <TextField
          {...register("bottles_returned")}
          label="Bidones Retornados"
          type="number"
          defaultValue={0}
        />
        <Select
          {...register("payment_status")}
          label="Estado de Pago"
          defaultValue="pending"
        >
          <MenuItem value="pending">Pendiente</MenuItem>
          <MenuItem value="paid">Pagado</MenuItem>
          <MenuItem value="failed">Fallido</MenuItem>
        </Select>
        <Select
          {...register("payment_method")}
          label="Método de Pago"
        >
          <MenuItem value="cash">Efectivo</MenuItem>
          <MenuItem value="mercado_pago">Mercado Pago</MenuItem>
        </Select>
        <Button
          variant="contained"
          onClick={handleGeneratePayment}
          disabled={watch("payment_status") !== "pending"}
        >
          Generar Link de Pago
        </Button>
      </Box>
    </Create>
  );
};