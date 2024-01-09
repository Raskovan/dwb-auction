import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import ItemPage from "./pages/ItemPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home />, errorElement: <NotFoundPage /> },
    { path: "items/:itemId", element: <ItemPage />, errorElement: <NotFoundPage /> }
  ],
  { basename: "/nrc-stupa-auction" }
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
