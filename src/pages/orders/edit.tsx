import { Edit } from "@refinedev/mui"; // Edit still comes from @refinedev/mui
import { useForm } from "@refinedev/react-hook-form"; // Correct import for useForm
import { Box, TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material"; // Added FormControl, InputLabel
import { useSelect } from "@refinedev/core";
import { IOrder } from "../../interfaces"; // Assuming IOrder is your TypeScript interface for orders
import { HttpError } from "@refinedev/core"; // Import HttpError if not already

// If IOrder is not already defining these properties, ensure they are present for type safety
// interface IOrder {
//   id: string | number;
//   customer_id: string | number;
//   status: string;
//   total_amount: number;
//   bottles_delivered?: number;
//   bottles_returned?: number;
//   payment_status?: string;
//   payment_method?: string;
//   // ... any other fields
// }

export const OrdersEdit: React.FC = () => {
  const {
    // react-hook-form methods, replacing the old `formProps` usage
    register,
    control, // Useful for <Controller> components with MUI Select if needed, but register also works
    handleSubmit, // For handling form submission if not relying solely on saveButtonProps
    formState: { errors }, // For displaying validation errors
    // Refine specific properties
    refineCore: { onFinish, queryResult, formLoading }, // queryResult is here
    saveButtonProps, // Props for the save button, handled by <Edit>
  } = useForm<IOrder, HttpError, IOrder>({ // Added IOrder for mutation variables type
    refineCoreProps: { // Core Refine options are nested here
      resource: "orders",
      action: "edit",
      // 'id' is usually inferred from the route for 'edit' actions
    },
  });

  const orderData = queryResult?.data?.data; // Convenience variable for the fetched order data

  const { options: customerOptions } = useSelect({
    resource: "customers",
    optionLabel: "user_id", // Make sure 'customers' have a 'user_id' field to display
    optionValue: "id",
    defaultValue: orderData?.customer_id, // Set default value for useSelect if needed
    filters: [{ field: "deleted_at", operator: "eq", value: null }],
  });

  const handleGeneratePayment = () => {
    alert(
      `Link de pago generado para el pedido con monto ${
        orderData?.total_amount || 0
      }`
    );
  };

  // The <Edit> component from @refinedev/mui handles the form submission
  // when its saveButtonProps are used, and also the loading state.
  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Box
        component="form"
        // No explicit onSubmit needed here if <Edit> and saveButtonProps handle it
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* For MUI Select with react-hook-form, using 'register' is okay,
            but for complex scenarios or better label handling, <Controller> can be used.
            Here, we ensure labels are correctly associated. */}
        <FormControl fullWidth>
          <InputLabel id="customer-select-label" required>Cliente</InputLabel>
          <Select
            labelId="customer-select-label"
            label="Cliente"
            defaultValue={orderData?.customer_id || ""} // Provide a default empty string if orderData is not yet loaded
            {...register("customer_id", { required: "Este campo es obligatorio" })}
            error={!!errors.customer_id}
          >
            {customerOptions?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors.customer_id && <Box sx={{ color: 'red', fontSize: '0.75rem', marginLeft: '14px' }}>{errors.customer_id.message}</Box>}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="status-select-label" required>Estado</InputLabel>
          <Select
            labelId="status-select-label"
            label="Estado"
            defaultValue={orderData?.status || ""}
            {...register("status", { required: "Este campo es obligatorio" })}
            error={!!errors.status}
          >
            <MenuItem value="pending">Pendiente</MenuItem>
            <MenuItem value="in_progress">En Progreso</MenuItem>
            <MenuItem value="delivered">Entregado</MenuItem>
            <MenuItem value="canceled">Cancelado</MenuItem>
          </Select>
           {errors.status && <Box sx={{ color: 'red', fontSize: '0.75rem', marginLeft: '14px' }}>{errors.status.message}</Box>}
        </FormControl>

        <TextField
          label="Monto Total"
          type="number"
          defaultValue={orderData?.total_amount || 0}
          {...register("total_amount", { required: "Este campo es obligatorio", valueAsNumber: true })}
          error={!!errors.total_amount}
          helperText={errors.total_amount?.message}
          required
        />
        <TextField
          label="Bidones Entregados"
          type="number"
          defaultValue={orderData?.bottles_delivered || 0}
          {...register("bottles_delivered", { valueAsNumber: true })}
          error={!!errors.bottles_delivered}
          helperText={errors.bottles_delivered?.message}
        />
        <TextField
          label="Bidones Retornados"
          type="number"
          defaultValue={orderData?.bottles_returned || 0}
          {...register("bottles_returned", { valueAsNumber: true })}
          error={!!errors.bottles_returned}
          helperText={errors.bottles_returned?.message}
        />

        <FormControl fullWidth>
          <InputLabel id="payment-status-select-label">Estado de Pago</InputLabel>
          <Select
            labelId="payment-status-select-label"
            label="Estado de Pago"
            defaultValue={orderData?.payment_status || ""}
            {...register("payment_status")}
            error={!!errors.payment_status}
          >
            <MenuItem value="pending">Pendiente</MenuItem>
            <MenuItem value="paid">Pagado</MenuItem>
            <MenuItem value="failed">Fallido</MenuItem>
          </Select>
           {errors.payment_status && <Box sx={{ color: 'red', fontSize: '0.75rem', marginLeft: '14px' }}>{errors.payment_status.message}</Box>}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="payment-method-select-label">Método de Pago</InputLabel>
          <Select
            labelId="payment-method-select-label"
            label="Método de Pago"
            defaultValue={orderData?.payment_method || ""}
            {...register("payment_method")}
            error={!!errors.payment_method}
          >
            <MenuItem value="cash">Efectivo</MenuItem>
            <MenuItem value="mercado_pago">Mercado Pago</MenuItem>
          </Select>
          {errors.payment_method && <Box sx={{ color: 'red', fontSize: '0.75rem', marginLeft: '14px' }}>{errors.payment_method.message}</Box>}
        </FormControl>

        <Button
          variant="contained"
          onClick={handleGeneratePayment}
          disabled={orderData?.payment_status !== "pending"}
        >
          Generar Link de Pago
        </Button>
      </Box>
    </Edit>
  );
};