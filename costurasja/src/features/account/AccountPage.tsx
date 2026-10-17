import React, { useState } from 'react';
import { useAuth } from '../../app/AuthContext';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  CreditCard, 
  Download, 
  Trash2, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { currentUser, currentRole } = useAuth();

  const [notifications, setNotifications] = useState({
    whatsapp: true,
    email: true,
    push: true
  });

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    next: '',
    confirm: ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveData = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportDataLGPD = () => {
    const data = JSON.stringify(currentUser, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alinhava-dados-lgpd-${currentUser?.id || 'usuario'}.json`;
    a.click();
    alert('Relatório com todos os seus dados da conta Alinhava baixado em conformidade com a LGPD.');
  };

  const handleDeleteAccountLGPD = () => {
    if (window.confirm('Tem certeza que deseja solicitar a exclusão definitiva dos seus dados e conta conforme previsto pela LGPD?')) {
      alert('Sua solicitação de exclusão foi registrada. Nossa equipe de conformidade executará o expurgo em até 15 dias corridos.');
    }
  };

  return (
    <div style={{ padding: '36px 0 80px', backgroundColor: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>
            Configurações e Segurança
          </span>
          <h1 style={{ fontSize: '28px', marginTop: '4px' }}>Minha Conta</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Gerencie seus dados de acesso, preferências de notificação e privacidade LGPD
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Dados Pessoais */}
          <div className="card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <User size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Dados Cadastrais</h3>
            </div>

            <form onSubmit={handleSaveData}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label className="label">Nome Completo</label>
                  <input type="text" className="input" defaultValue={currentUser?.name} />
                </div>
                <div>
                  <label className="label">E-mail</label>
                  <input type="email" className="input" defaultValue={currentUser?.email} />
                </div>
                <div>
                  <label className="label">Telefone / WhatsApp</label>
                  <input type="text" className="input" defaultValue={currentUser?.phone} />
                </div>
                <div>
                  <label className="label">Empresa / Razão Social</label>
                  <input type="text" className="input" defaultValue={currentUser?.company_name} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary btn-sm">
                  {savedSuccess ? <><Check size={14} /> Dados Salvos!</> : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>

          {/* Notificações (RF17) */}
          <div className="card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Bell size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Canais de Notificação (RF17)</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Notificações por WhatsApp</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Alertas de nova mensagem no chat, novo pedido e mudança de etapa de produção</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.whatsapp}
                  onChange={(e) => setNotifications({ ...notifications, whatsapp: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Notificações por E-mail</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Faturas, comprovantes e relatórios mensais</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '8px 0' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Notificações Push no Navegador / Celular</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Mensagens instantâneas quando o app estiver em segundo plano</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
              </label>
            </div>
          </div>

          {/* Privacidade e LGPD */}
          <div className="card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Shield size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Privacidade e Conformidade LGPD</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
              A plataforma Alinhava respeita integralmente a Lei Geral de Proteção de Dados (Lei 13.709/2018). Você pode baixar todos os seus dados a qualquer momento ou revogar seu consentimento.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleExportDataLGPD}
                className="btn btn-secondary btn-sm"
              >
                <Download size={14} /> Exportar Meus Dados (JSON)
              </button>

              <button
                type="button"
                onClick={handleDeleteAccountLGPD}
                className="btn btn-danger btn-sm"
              >
                <Trash2 size={14} /> Solicitar Exclusão da Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
