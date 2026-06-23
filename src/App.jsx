import './index.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from './components/LoadingSpinner';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage'));
const CustomerDetailPage = lazy(() => import('./pages/CustomerDetailPage'));
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'));
const StockPage = lazy(() => import('./pages/StockPage'));
const PreOrderPage = lazy(() => import('./pages/PreOrderPage'));
const LoyaltyPage = lazy(() => import('./pages/LoyaltyPage'));
const SegmentationPage = lazy(() => import('./pages/SegmentationPage'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));
const TrackingPage = lazy(() => import('./pages/TrackingPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const OmnichannelPage = lazy(() => import('./pages/OmnichannelPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// [TAMBAHKAN] Import UsersPage
const UsersPage = lazy(() => import('./pages/UsersPage'));

// Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Forgot = lazy(() => import('./pages/auth/Forgot'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} /> 
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/preorder" element={<PreOrderPage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
          <Route path="/segmentation" element={<SegmentationPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/tracking/:id" element={<TrackingPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/omnichannel" element={<OmnichannelPage />} />
          
          {/* [TAMBAHKAN] Route untuk UsersPage */}
          <Route path="/users" element={<UsersPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;