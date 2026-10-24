import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { UserRole } from '../../lib/types';
import logoImg from '../../assets/logo.png';
import { 
  Scissors, 
  Building2, 
  Store, 
  Check, 
  ArrowRight, 
  AlertCircle
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('tipo') === 'costureira' ? 'seamstress' : 'client';
  
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialType);
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    company_name: '',
    cnpj: '',
    city: 'São Paulo',
    state: 'SP'
  });

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.email.includes('@')) {
      setErrorMsg('Por favor, informe um endereço de e-mail válido.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        phone: formData.phone,
        company_name: formData.company_name,
        cnpj: formData.cnpj,
        city: formData.city,
        state: formData.state
      });

      if (selectedRole === 'seamstress') {
        navigate('/onboarding');
      } else if (selectedRole === 'client') {
        navigate('/costureiras');
      } else {
        navigate('/fornecedores');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao realizar o cadastro. Verifique os dados informados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '48px 0', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <img
              src={logoImg}
              alt="Alinhava Gestão Têxtil"
              style={{ height: '54px', width: 'auto', margin: '0 auto', display: 'block' }}
            />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>
            Etapa {step} de 2
          </span>
          <h1 style={{ fontSize: '28px', marginTop: '4px' }}>Crie sua conta na Alinhava</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
            {step === 1 && 'Escolha o nível de cadastro do seu perfil na plataforma'}
            {step === 2 && 'Preencha suas informações cadastrais para acessar'}
          </p>
        </div>

        {/* Stepper Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          {[1, 2].map((s) => (
            <div
              key={s}
              style={{
                width: s === step ? '32px' : '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: s <= step ? 'var(--primary)' : 'var(--border)',
                transition: 'all 0.25s ease'
              }}
            />
          ))}
        </div>

        {errorMsg && (
          <div className="alert alert-danger" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="card" style={{ padding: '32px' }}>
          {/* ETAPA 1: Seleção dos 3 Níveis de Cadastro */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '18px' }}>Selecione seu nível de cadastro</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {/* 1. Nível: Costureira / Facção */}
                <div
                  onClick={() => setSelectedRole('seamstress')}
                  style={{
                    padding: '18px',
                    borderRadius: 'var(--radius-md)',
                    border: selectedRole === 'seamstress' ? '2px solid var(--primary)' : '1px solid var(--border)',
                    backgroundColor: selectedRole === 'seamstress' ? 'var(--primary-soft)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <Scissors size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, fontSize: '15px' }}>1. Sou Costureira / Facção</span>
                      <span className="badge badge-success">Cadastro Grátis</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Receba pedidos de grandes marcas, mostre seu maquinário e receba sem calotes.
                    </p>
                  </div>
                </div>

                {/* 2. Nível: Contratante / Marca */}
                <div
                  onClick={() => setSelectedRole('client')}
                  style={{
                    padding: '18px',
                    borderRadius: 'var(--radius-md)',
                    border: selectedRole === 'client' ? '2px solid var(--primary)' : '1px solid var(--border)',
                    backgroundColor: selectedRole === 'client' ? 'var(--primary-soft)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <Building2 size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, fontSize: '15px' }}>2. Sou Contratante / Confecção / Marca</span>
                      <span className="badge badge-primary">Empresas & Marcas</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Encontre oficinas verificadas para produzir lotes com ficha técnica e prazos controlados.
                    </p>
                  </div>
                </div>

                {/* 3. Nível: Fornecedor Têxtil */}
                <div
                  onClick={() => setSelectedRole('supplier')}
                  style={{
                    padding: '18px',
                    borderRadius: 'var(--radius-md)',
                    border: selectedRole === 'supplier' ? '2px solid var(--primary)' : '1px solid var(--border)',
                    backgroundColor: selectedRole === 'supplier' ? 'var(--primary-soft)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <Store size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, fontSize: '15px' }}>3. Sou Fornecedor Têxtil</span>
                      <span className="badge badge-neutral">Vitrine & Insumos</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Divulgue máquinas, tecidos e aviamentos para toda a rede nacional de confecções.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Continuar para Dados Cadastrais <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* ETAPA 2: Preenchimento de Dados e Finalização Direta */}
          {step === 2 && (
            <form onSubmit={handleCompleteRegistration}>
              <h3 style={{ fontSize: '18px', marginBottom: '18px' }}>Dados do seu perfil</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label className="label">Nome Completo do Responsável</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Maria de Lourdes Silva"
                    className="input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com.br"
                    className="input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="label">Telefone / WhatsApp (Opcional)</label>
                    <input
                      type="text"
                      placeholder="(11) 98765-4321"
                      className="input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">Senha Segura</label>
                    <input
                      type="password"
                      required
                      placeholder="Mínimo 8 dígitos"
                      className="input"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>

                {(selectedRole === 'client' || selectedRole === 'supplier') && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label className="label">Razão Social / Nome Fantasia</label>
                      <input
                        type="text"
                        placeholder="Nome da sua empresa"
                        className="input"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">CNPJ da Empresa</label>
                      <input
                        type="text"
                        placeholder="00.000.000/0001-00"
                        className="input"
                        value={formData.cnpj}
                        onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="label">Cidade</label>
                    <input
                      type="text"
                      required
                      className="input"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">UF</label>
                    <select
                      className="select"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    >
                      <option value="SP">SP</option>
                      <option value="SC">SC</option>
                      <option value="MG">MG</option>
                      <option value="RJ">RJ</option>
                      <option value="GO">GO</option>
                      <option value="PE">PE</option>
                      <option value="CE">CE</option>
                      <option value="PR">PR</option>
                      <option value="RS">RS</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ flex: 2 }}
                >
                  {loading ? 'Criando conta...' : (
                    <>
                      Concluir Cadastro e Acessar <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Já possui cadastro?{' '}
          <Link to="/entrar" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  );
};
