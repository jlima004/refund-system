import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { NewRefund } from "./pages/NewRefund";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/refund/success" element={<div>Success</div>} />
          <Route path="/refund/new" element={<NewRefund />} />
          <Route path="/refund/:id" element={<div>Detalhe</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
