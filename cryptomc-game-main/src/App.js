
import { HashRouter, Route, Routes } from "react-router-dom";
import ShopBurgers from "./components/shop/ShopBurgers";
import ShopTools from "./components/shop/ShopTools";
import Layout from "./Layout"
import Delivery from './routes/Delivery';
import Home from './routes/Home';
import Inventory from './routes/Inventory';
import Shop from './routes/Shop';
import Tools from './routes/Tools';
import Whitepaper from './routes/Whitepaper';

function App() {
  return (
    <HashRouter>
    <Routes>
        <Route path="/" element={<Layout/>}>

          <Route path="/home" element={<Home/>}/>

          <Route index element={<Inventory/>}/>

          <Route path="/inventory" element={<Inventory/>}/>

          <Route path="/tools" element={<Tools/>}/>

          <Route path="/delivery" element={<Delivery/>}/>

          <Route path="/shop" element={<Shop/>}>
            <Route index element={<ShopBurgers/>}/>
            <Route path="/shop/shopburgers" element={<ShopBurgers/>}/>
            <Route path="/shop/shoptools" element={<ShopTools/>}/>
          </Route>

          <Route path="/whitepaper" element={<Whitepaper/>}/>

        </Route>
    </Routes>
</HashRouter>
  );
}

export default App;
