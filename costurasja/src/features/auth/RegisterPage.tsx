import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { UserRole } from '../../lib/types';
import { 
  Scissors, 
  Building2, 
  Store, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  Smartphone,
  Lock,
  Mail,
  User
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('tipo') === 'costureira' ? 'seamstress' : 'client';
  
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialType);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [codeSent, setCodeSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '(11) 98765-4321',
    password: '',
    company_name: '',
    cnpj: '',
    city: 'São Paulo',
    state: 'SP'
  });

  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setCodeSent(true);
      setStep(3);
    } else if (step === 3) {
      switchRole(selectedRole);
      if (selectedRole === 'seamstress') {
        navigate('/onboarding');
      } else {
        navigate('/costureiras');
      }
    }
  };

  return (
    <div style={{ padding: '48px 0', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>
            Etapa {step} de 3
          </span>
          <h1 style={{ fontSize: '28px', marginTop: '4px' }}>Crie sua conta na Alinhava</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
            {step === 1 && 'Escolha como você deseja utilizar a plataforma'}
            {step === 2 && 'Preencha as informações do seu cadastro'}
            {step === 3 && 'Confirme seu número via WhatsApp ou SMS'}
          </p>
        </div>

        {/* Stepper Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          {[1, 2, 3].map((s) => (
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

        <div className="card" style={{ padding: '32px' }}>
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '18px' }}>Selecione seu perfil</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {/* Costureira */}
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
                      <span style={{ fontWeight: 600, fontSize: '15px' }}>Sou Costureira / Facção</span>
                      <span className="badge badge-success">Cadastro Grátis</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Receba pedidos de grandes marcas, mostre seu maquinário e receba sem calotes.
                    </p>
                  </div>
                </div>

                {/* Contratante */}
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
                      <span style={{ fontWeight: 600, fontSize: '15px' }}>Sou Contratante / Marca</span>
                      <span className="badge badge-primary">Empresas & Marcas</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Encontre oficinas verificadas para produzir lotes com ficha técnica e prazos controlados.
                    </p>
                  </div>
                </div>

                {/* Fornecedor */}
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
                      <span style={{ fontWeight: 600, fontSize: '15px' }}>Sou Fornecedor Têxtil</span>
                      <span className="badge badge-neutral">Vitrine & Insumos</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Divulgue máquinas, tecidos e aviamentos para toda a rede de confecções.
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

          {step === 2 && (
            <form onSubmit={handleNextStep}>
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
                  <label className="label">E-mail Profissional</label>
                  <input
                    type="email"
                    required
                    placeholder="contato@minhaconfeccao.com.br"
                    className="input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="label">WhatsApp com DDD</label>
                    <input
                      type="text"
                      required
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

                {selectedRole === 'client' && (
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
                  className="btn btn-primary"
                  style={{ flex: 2 }}
                >
                  Verificar Telefone <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-soft)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <Smartphone size={28} />
                </div>
                <h3 style={{ fontSize: '20px' }}>Código de Verificação SMS / WhatsApp</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
                  Enviamos um código de 6 dígitos para o número <strong>{formData.phone}</strong>
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '24px 0' }}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="input"
                    style={{ width: '44px', height: '48px', textAlign: 'center', fontSize: '20px', fontWeight: 700 }}
                    value={verificationCode[i] || (i === 0 ? '7' : i === 1 ? '4' : i === 2 ? '9' : '')}
                    onChange={(e) => {
                      const newCode = [...verificationCode];
                      newCode[i] = e.target.value;
                      setVerificationCode(newCode);
                    }}
                  />
                ))}
              </div>

              <div className="alert alert-primary" style={{ marginBottom: '24px', fontSize: '13px' }}>
                <ShieldCheck size={20} style={{ flexShrink: 0 }} />
                <span>
                  A verificação de telefone garante que apenas profissionais e marcas autênticas participem da plataforma Alinhava.
                </span>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '12px' }}
              >
                Concluir Cadastro e Acessar <Check size={16} />
              </button>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => alert('Novo código enviado com sucesso!')}
                >
                  Não recebeu? Reenviar código em 45s
                </button>
              </div>
            </div>
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
