import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { UserRole } from '../../lib/types';
import { Mail, Lock, LogIn, Sparkles, Scissors, Building2, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('carlos@modaurbana.com.br');
  const [password, setPassword] = useState('••••••••');
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login('client');
    navigate('/costureiras');
  };

  const handleQuickDemo = (role: UserRole) => {
    switchRole(role);
    if (role === 'admin') navigate('/admin');
    else if (role === 'seamstress') navigate('/painel');
    else if (role === 'client') navigate('/costureiras');
    else if (role === 'supplier') navigate('/fornecedores');
  };

  return (
    <div style={{ padding: '60px 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'var(--primary-soft)',
              color: 'var(--primary)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <Scissors size={26} />
          </div>
          <h1 style={{ fontSize: '26px' }}>Entrar na Alinhava</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
            Acesse seu painel de gestão têxtil
          </p>
        </div>

        <div className="card" style={{ padding: '32px' }}>
          {/* Quick Demo Access Bar */}
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              marginBottom: '24px',
              border: '1px solid var(--border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', marginBottom: '8px' }}>
              <Sparkles size={14} /> Atalho de Demonstração Rápida:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <button
                type="button"
                onClick={() => handleQuickDemo('client')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', justifyContent: 'flex-start' }}
              >
                <Building2 size={13} /> Contratante
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('seamstress')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', justifyContent: 'flex-start' }}
              >
                <Scissors size={13} /> Costureira
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', justifyContent: 'flex-start' }}
              >
                <ShieldCheck size={13} /> Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('supplier')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', justifyContent: 'flex-start' }}
              >
                Fornecedor
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label className="label">E-mail</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '38px' }}
                  />
                  <Mail
                    size={16}
                    color="var(--text-secondary)"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="label" style={{ marginBottom: 0 }}>Senha</label>
                  <a
                    href="#esqueci"
                    onClick={(e) => { e.preventDefault(); alert('Link de recuperação enviado para seu e-mail cadastrado.'); }}
                    style={{ fontSize: '12px', color: 'var(--primary)', textDecoration: 'none' }}
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '38px' }}
                  />
                  <Lock
                    size={16}
                    color="var(--text-secondary)"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '16px' }}>
              <LogIn size={16} /> Entrar na Plataforma
            </button>

            <button
              type="button"
              onClick={() => { login('client'); navigate('/costureiras'); }}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Continuar com Google
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Não possui uma conta?{' '}
          <Link to="/cadastro" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            Cadastre-se gratuitamente
          </Link>
        </div>
      </div>
    </div>
  );
};
