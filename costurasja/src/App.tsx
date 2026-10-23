import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './app/AuthContext';
import { Layout } from './app/Layout';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 14 screens from Section 9
import { LandingPage } from './features/landing/LandingPage';
import { RegisterPage } from './features/auth/RegisterPage';
import { LoginPage } from './features/auth/LoginPage';
import { OnboardingPage } from './features/onboarding/OnboardingPage';
import { SearchPage } from './features/search/SearchPage';
import { SeamstressProfilePage } from './features/profile/SeamstressProfilePage';
import { ChatPage } from './features/chat/ChatPage';
import { OrdersListPage } from './features/orders/OrdersListPage';
import { OrderDetailPage } from './features/orders/OrderDetailPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { PlansPage } from './features/plans/PlansPage';
import { SuppliersPage } from './features/suppliers/SuppliersPage';
import { AccountPage } from './features/account/AccountPage';
import { AdminPage } from './features/admin/AdminPage';

import './styles/index.css';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Layout>
          <Routes>
            {/* 1. Landing (Público) */}
            <Route path="/" element={<LandingPage />} />

            {/* 2. Cadastro (Público) */}
            <Route path="/cadastro" element={<RegisterPage />} />

            {/* 3. Login (Público) */}
            <Route path="/entrar" element={<LoginPage />} />

            {/* 4. Onboarding (Costureira) */}
            <Route path="/onboarding" element={<OnboardingPage />} />

            {/* 5. Busca (Contratante) */}
            <Route path="/costureiras" element={<SearchPage />} />

            {/* 6. Perfil da Costureira (Contratante) */}
            <Route path="/costureiras/:id" element={<SeamstressProfilePage />} />

            {/* 7. Chat (Todos) */}
            <Route path="/chat" element={<ChatPage />} />

            {/* 8. Lista de Pedidos (Todos) */}
            <Route path="/pedidos" element={<OrdersListPage />} />

            {/* 9. Detalhe do Pedido (Participantes) */}
            <Route path="/pedidos/:id" element={<OrderDetailPage />} />

            {/* 10. Painel / Dashboard (Contratante e Costureira) */}
            <Route path="/painel" element={<DashboardPage />} />

            {/* 11. Planos (Contratante) */}
            <Route path="/planos" element={<PlansPage />} />

            {/* 12. Soluções e Fornecedores (Todos) */}
            <Route path="/fornecedores" element={<SuppliersPage />} />

            {/* 13. Minha Conta e LGPD (Todos) */}
            <Route path="/conta" element={<AccountPage />} />

            {/* 14. Administração da Plataforma (Admin) */}
            <Route path="/admin" element={<AdminPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
