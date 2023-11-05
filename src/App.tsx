import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import ItemPage from "./pages/ItemPage";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <NotFoundPage /> },
  { path: "items/:itemId", element: <ItemPage />, errorElement: <NotFoundPage /> }
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
