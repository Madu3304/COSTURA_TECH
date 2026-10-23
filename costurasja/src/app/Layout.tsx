import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { UserRole } from '../lib/types';
import { 
  Search, 
  MessageSquare, 
  Package, 
  LayoutDashboard, 
  Layers, 
  ShieldCheck, 
  LogOut, 
  Sparkles,
  Scissors
} from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, currentRole, switchRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const rolesList: { role: UserRole; label: string; badge: string }[] = [
    { role: 'seamstress', label: 'Costureira / Facção', badge: 'Grátis' },
    { role: 'client', label: 'Contratante / Confecção', badge: 'Plano Ativo' },
    { role: 'supplier', label: 'Fornecedor', badge: 'Vitrine' },
    { role: 'admin', label: 'Administrador', badge: 'Staff' }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background)' }}>
      {/* Top Demo Bar for Reviewers */}
      <div
        style={{
          backgroundColor: 'var(--text-primary)',
          color: '#FFFFFF',
          padding: '8px 16px',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          zIndex: 50
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="#48C7B9" />
          <span style={{ fontWeight: 600 }}>Simulador de Perfil (Seção 2):</span>
          <span style={{ color: '#B2DFDB', fontSize: '12px' }}>
            Alternar perfil para visualizar as telas e permissões correspondentes:
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {rolesList.map((item) => (
            <button
              key={item.role}
              onClick={() => {
                if (!currentUser) {
                  navigate(`/entrar?tipo=${item.role}`);
                  return;
                }
                switchRole(item.role);
                if (item.role === 'admin') navigate('/admin');
                else if (item.role === 'seamstress') navigate('/painel');
                else if (item.role === 'client') navigate('/costureiras');
                else if (item.role === 'supplier') navigate('/fornecedores');
              }}
              style={{
                backgroundColor: currentRole === item.role ? 'var(--primary)' : 'rgba(255,255,255,0.12)',
                color: '#FFFFFF',
                border: 'none',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: currentRole === item.role ? 600 : 400,
                transition: 'all 0.15s ease'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                backgroundColor: 'var(--primary-soft)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}
            >
              <Scissors size={20} strokeWidth={2.2} />
            </div>
            <div>
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Alinhava
              </span>
              <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '-3px' }}>
                Gestão Têxtil
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
            <Link
              to="/painel"
              className={`btn btn-ghost btn-sm ${isCurrent('/painel') ? 'btn-soft' : ''}`}
            >
              <LayoutDashboard size={16} /> Painel
            </Link>

            <Link
              to="/costureiras"
              className={`btn btn-ghost btn-sm ${isCurrent('/costureiras') ? 'btn-soft' : ''}`}
            >
              <Search size={16} /> {currentRole === 'seamstress' ? 'Oportunidades' : 'Buscar Costureiras'}
            </Link>

            <Link
              to="/pedidos"
              className={`btn btn-ghost btn-sm ${isCurrent('/pedidos') ? 'btn-soft' : ''}`}
            >
              <Package size={16} /> Pedidos
            </Link>

            <Link
              to="/chat"
              className={`btn btn-ghost btn-sm ${isCurrent('/chat') ? 'btn-soft' : ''}`}
            >
              <MessageSquare size={16} /> Chat
            </Link>

            {currentRole === 'client' && (
              <Link
                to="/planos"
                className={`btn btn-ghost btn-sm ${isCurrent('/planos') ? 'btn-soft' : ''}`}
              >
                <Layers size={16} /> Planos
              </Link>
            )}

            {currentRole === 'admin' && (
              <Link
                to="/admin"
                className={`btn btn-ghost btn-sm ${isCurrent('/admin') ? 'btn-soft' : ''}`}
                style={{ color: 'var(--primary)', fontWeight: 600 }}
              >
                <ShieldCheck size={16} /> Painel Admin
              </Link>
            )}
          </nav>

          {/* User Profile / Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link
                  to="/conta"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)'
                  }}
                >
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 500 }}>
                      {currentRole === 'seamstress' ? 'Costureira' : currentRole === 'client' ? 'Contratante' : currentRole === 'supplier' ? 'Fornecedor' : 'Admin'}
                    </div>
                  </div>
                </Link>

                <button
                  onClick={logout}
                  title="Sair"
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '6px' }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/entrar" className="btn btn-secondary btn-sm">
                  Entrar
                </Link>
                <Link to="/cadastro" className="btn btn-primary btn-sm">
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
};
