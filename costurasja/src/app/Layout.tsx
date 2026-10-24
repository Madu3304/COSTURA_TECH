import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import logoImg from '../assets/logo.png';
import { 
  Search, 
  MessageSquare, 
  Package, 
  LayoutDashboard, 
  Layers, 
  ShieldCheck, 
  LogOut, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, currentRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background)' }}>
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
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src={logoImg}
              alt="Alinhava Gestão Têxtil"
              style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </Link>

          {isHome ? (
            /* Menu Inicial na Landing: Apenas Planos, Perguntas e o botão com a seta para Acessar */
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => scrollToSection('planos')}
                className="btn btn-ghost btn-sm"
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}
              >
                <Layers size={16} /> Planos
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('duvidas')}
                className="btn btn-ghost btn-sm"
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}
              >
                <HelpCircle size={16} /> Perguntas
              </button>

              <Link
                to={currentUser ? '/painel' : '/entrar'}
                className="btn btn-primary btn-sm"
                title="Acessar o site"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  fontSize: '14px',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(22, 110, 119, 0.20)'
                }}
              >
                <span>Acessar</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            /* Menu Completo quando o usuário acessa o site (Painel, Buscar Costureiras, Pedidos, Chat, Planos) */
            <>
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

                <Link
                  to="/planos"
                  className={`btn btn-ghost btn-sm ${isCurrent('/planos') ? 'btn-soft' : ''}`}
                >
                  <Layers size={16} /> Planos
                </Link>

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
            </>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Global Footer */}
      <footer
        style={{
          backgroundColor: '#0E292C',
          color: '#E0EDE9',
          borderTop: '1px solid #1C4044',
          padding: '48px 0 24px',
          marginTop: 'auto'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '36px',
              paddingBottom: '36px',
              borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            {/* Col 1: Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '6px 12px', borderRadius: '10px', display: 'inline-flex' }}>
                  <img
                    src={logoImg}
                    alt="Alinhava Gestão Têxtil"
                    style={{ height: '32px', width: 'auto', display: 'block', objectFit: 'contain' }}
                  />
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#A0BEB9', lineHeight: 1.6 }}>
                A plataforma que une confecções a oficinas de costura qualificadas com segurança, rastreamento de ponta a ponta e lances diretos.
              </p>
            </div>

            {/* Col 2: Navegação */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF', marginBottom: '14px' }}>Plataforma</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <li><Link to="/painel" style={{ color: '#A0BEB9', textDecoration: 'none' }}>Painel de Controle</Link></li>
                <li><Link to="/costureiras" style={{ color: '#A0BEB9', textDecoration: 'none' }}>Buscar Costureiras</Link></li>
                <li><Link to="/pedidos" style={{ color: '#A0BEB9', textDecoration: 'none' }}>Gestão de Pedidos</Link></li>
                <li><Link to="/planos" style={{ color: '#A0BEB9', textDecoration: 'none' }}>Planos para Marcas</Link></li>
                <li><Link to="/fornecedores" style={{ color: '#A0BEB9', textDecoration: 'none' }}>Vitrine de Fornecedores</Link></li>
              </ul>
            </div>

            {/* Col 3: Segurança */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF', marginBottom: '14px' }}>Segurança & LGPD</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <li><span style={{ color: '#A0BEB9' }}>Proteção Antigolpe no Chat</span></li>
                <li><span style={{ color: '#A0BEB9' }}>Ficha Técnica Padronizada</span></li>
                <li><span style={{ color: '#A0BEB9' }}>Avaliações Mútuas Verificadas</span></li>
                <li><Link to="/conta" style={{ color: '#A0BEB9', textDecoration: 'none' }}>Privacidade de Dados (LGPD)</Link></li>
              </ul>
            </div>

            {/* Col 4: Contato */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF', marginBottom: '14px' }}>Atendimento</h4>
              <p style={{ fontSize: '13px', color: '#A0BEB9', lineHeight: 1.6, marginBottom: '8px' }}>
                Segunda a Sexta, das 08h às 18h
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#48C7B9', backgroundColor: 'rgba(72, 199, 185, 0.1)', padding: '4px 10px', borderRadius: '4px' }}>
                <ShieldCheck size={14} /> Ambiente Seguro B2B
              </div>
            </div>
          </div>

          <div
            style={{
              paddingTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '12px',
              color: '#769994'
            }}
          >
            <span>© 2026 Alinhava Gestão Têxtil. Todos os direitos reservados.</span>
            <span>Versão Beta 1.0 • Desenvolvido para a Indústria da Moda</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
