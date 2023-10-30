import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserOrderPage from './pages/UserOrderPage';
import MerchantPage from './pages/MerchantPage';
import SuccessPage from './pages/SuccessPage';
import { ItemsProvider } from "./context/ItemsContext";
import Layout from "./components/Layout";

function App() {
    return (
        <Router>
            <ItemsProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<UserOrderPage />} />
                        <Route path="/merchant" element={<MerchantPage />} />
                        <Route path="/success/:orderId" element={<SuccessPage />} /> {/* New success route */}
                    </Routes>
                </Layout>
            </ItemsProvider>
        </Router>
    );
}

export default App;
