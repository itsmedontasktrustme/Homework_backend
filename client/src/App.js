import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import KrmelecDashboard from "./krmelec/dashboard";
import Krmiva from "./krmiva/krmivas";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<KrmelecDashboard />} />
            <Route path="/krmelec" element={<KrmelecDashboard />} />
            <Route path="/krmiva" element={<Krmiva />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

 // TODO
// rename krmelec
// add krmelec-krmivo mapping
// to je fakt vse???
export default App;
