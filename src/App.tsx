/* eslint-disable @typescript-eslint/no-var-requires */
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { AuthPage, ThemedLayoutV2, useNotificationProvider } from "@refinedev/mui";
import routerBindings, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { supabaseClient } from "./utility/supabaseClient";
import  authProvider  from "./authProvider";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <Refine
            authProvider={authProvider}
            dataProvider={{
              default: {
                ...require("@refinedev/supabase").dataProvider(supabaseClient),
              },
            }}
            routerProvider={routerBindings}
            notificationProvider={useNotificationProvider}
            resources={[
              { name: "orders", list: "/orders", create: "/orders/create", edit: "/orders/edit/:id" },
              { name: "customers", list: "/customers" },
              { name: "products", list: "/products" },
              { name: "inventory", list: "/inventory" },
              { name: "routes", list: "/routes" },
              { name: "driver_locations", list: "/driver_locations" },
              { name: "invoices", list: "/invoices" },
              { name: "notifications", list: "/notifications" },
              { name: "order_audit", list: "/order_audit" },
              {
                name: "orders",
                list: "/orders",
                create: "/orders/create",
                edit: "/orders/edit/:id",
                show: "/orders/show/:id"
              },
              {
                name: "customers",
                list: "/customers",
                create: "/customers/create",
                edit: "/customers/edit/:id",
                show: "/customers/show/:id"
              },
              {
                name: "products",
                list: "/products",
                create: "/products/create",
                edit: "/products/edit/:id",
                show: "/products/show/:id"
              },
              {
                name: "inventory",
                list: "/inventory",
                create: "/inventory/create",
                edit: "/inventory/edit/:id",
                show: "/inventory/show/:id"
              },
              {
                name: "routes",
                list: "/routes",
                create: "/routes/create",
                edit: "/routes/edit/:id",
                show: "/routes/show/:id"
              },
              {
                name: "driver_locations",
                list: "/driver_locations",
                create: "/driver_locations/create",
                edit: "/driver_locations/edit/:id",
                show: "/driver_locations/show/:id"
              },
              {
                name: "invoices",
                list: "/invoices",
                create: "/invoices/create",
                edit: "/invoices/edit/:id",
                show: "/invoices/show/:id"
              },
              {
                name: "notifications",
                list: "/notifications",
                create: "/notifications/create",
                edit: "/notifications/edit/:id",
                show: "/notifications/show/:id"
              },
              {
                name: "order_audit",
                list: "/order_audit",
                create: "/order_audit/create",
                edit: "/order_audit/edit/:id",
                show: "/order_audit/show/:id"
              }
            ]}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route path="/orders" element={<Outlet />} />
                <Route path="/orders/create" element={<Outlet />} />
                <Route path="/orders/edit/:id" element={<Outlet />} />
                <Route path="/customers" element={<Outlet />} />
                <Route path="/products" element={<Outlet />} />
                <Route path="/inventory" element={<Outlet />} />
                <Route path="/routes" element={<Outlet />} />
                <Route path="/driver_locations" element={<Outlet />} />
                <Route path="/invoices" element={<Outlet />} />
                <Route path="/notifications" element={<Outlet />} />
                <Route path="/order_audit" element={<Outlet />} />
                <Route path="*" element={<NavigateToResource resource="orders" />} />
              </Route>
              <Route path="/login" element={<AuthPage type="login" />} />
            </Routes>
            <RefineKbar />
          </Refine>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;