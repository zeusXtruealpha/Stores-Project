import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import UpdateCenter from './pages/UpdateCenter';
import Inward from './pages/Inward';
import Outward from './pages/Outward';
import StockRegister from './pages/StockRegister';
import PrecisionUpdate from './pages/PrecisionUpdate';
import PrecisionRegister from './pages/PrecisionRegister';
import PrecisionHistory from './pages/PrecisionHistory';
import TransactionHistory from './pages/TransactionHistory';
import RequestApproval from './pages/RequestApproval.jsx';
import UpdateData from './pages/UpdateData';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/index" element={<Index />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/update-center" element={
                <ProtectedRoute>
                  <UpdateCenter />
                </ProtectedRoute>
              } />
              <Route path="/inward" element={
                <ProtectedRoute>
                  <Inward />
                </ProtectedRoute>
              } />
              <Route path="/outward" element={
                <ProtectedRoute>
                  <Outward />
                </ProtectedRoute>
              } />
              <Route path="/stock-register" element={
                <ProtectedRoute>
                  <StockRegister />
                </ProtectedRoute>
              } />
              <Route path="/precision-update" element={
                <ProtectedRoute>
                  <PrecisionUpdate />
                </ProtectedRoute>
              } />
              <Route path="/precision-register" element={
                <ProtectedRoute>
                  <PrecisionRegister />
                </ProtectedRoute>
              } />
              <Route path="/precision-history" element={
                <ProtectedRoute>
                  <PrecisionHistory />
                </ProtectedRoute>
              } />
              <Route path="/transaction-history" element={
                <ProtectedRoute>
                  <TransactionHistory />
                </ProtectedRoute>
              } />
              <Route path="/request-approval" element={
                <ProtectedRoute>
                  <RequestApproval />
                </ProtectedRoute>
              } />
              <Route path="/update-data" element={
                <ProtectedRoute>
                  <UpdateData />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
