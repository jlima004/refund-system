import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { NewRefund } from "./pages/NewRefund";
import { Success } from "./pages/Success";
import { RefundDetail } from "./pages/RefundDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/refund/success" element={<Success />} />
          <Route path="/refund/new" element={<NewRefund />} />
          <Route path="/refund/:id" element={<RefundDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
