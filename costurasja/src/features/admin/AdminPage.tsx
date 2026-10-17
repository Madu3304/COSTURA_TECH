import React, { useState } from 'react';
import { mockPlatformUsers } from '../../lib/mockData';
import { PlatformUserItem } from '../../lib/types';
import { 
  ShieldCheck, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Scissors, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Ban, 
  Store,
  Filter
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [userList, setUserList] = useState<PlatformUserItem[]>(mockPlatformUsers);
  const [searchUser, setSearchUser] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('todos');

  const filteredUsers = userList.filter((u) => {
    if (roleFilter !== 'todos' && u.role !== roleFilter) return false;
    if (searchUser) {
      const q = searchUser.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.company_name && u.company_name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const toggleUserStatus = (id: string) => {
    setUserList(
      userList.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'active' ? 'suspended' : 'active';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  return (
    <div style={{ padding: '36px 0 80px', backgroundColor: 'var(--surface)' }}>
      <div className="container">
        {/* Admin Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-primary">Painel Interno</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Administração Geral</span>
            </div>
            <h1 style={{ fontSize: '28px', marginTop: '6px' }}>Gestão Administrativa da Plataforma</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
              Visão geral de usuários, ateliês cadastrados, métricas operacionais e moderação
            </p>
          </div>
        </div>

        {/* Global Statistics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <span className="text-muted text-xs font-semibold" style={{ textTransform: 'uppercase' }}>Oficinas Cadastradas</span>
            <div style={{ fontSize: '26px', fontWeight: 700, marginTop: '6px', color: 'var(--text-primary)' }}>
              1.428 costureiras
            </div>
            <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '4px' }}>+84 novas este mês</div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <span className="text-muted text-xs font-semibold" style={{ textTransform: 'uppercase' }}>Assinantes Ativos</span>
            <div style={{ fontSize: '26px', fontWeight: 700, marginTop: '6px', color: 'var(--primary)' }}>
              312 contratantes
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Taxa de renovação: 94%</div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <span className="text-muted text-xs font-semibold" style={{ textTransform: 'uppercase' }}>Pedidos em Produção</span>
            <div style={{ fontSize: '26px', fontWeight: 700, marginTop: '6px', color: 'var(--text-primary)' }}>
              89 pedidos
            </div>
            <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '4px' }}>98% dentro do prazo</div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <span className="text-muted text-xs font-semibold" style={{ textTransform: 'uppercase' }}>Volume Transacionado</span>
            <div style={{ fontSize: '26px', fontWeight: 700, marginTop: '6px', color: 'var(--success)' }}>
              R$ 842.000
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>3.450 peças concluídas</div>
          </div>
        </div>

        {/* Users Management Table */}
        <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Gerenciamento de Usuários e Empresas</h3>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Buscar usuário ou empresa..."
                  className="input"
                  style={{ height: '38px', paddingLeft: '34px', fontSize: '13px', width: '220px' }}
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
                <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>

              <select
                className="select"
                style={{ height: '38px', fontSize: '13px', width: '160px' }}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="todos">Todos os Papéis</option>
                <option value="seamstress">Costureiras</option>
                <option value="client">Contratantes</option>
                <option value="supplier">Fornecedores</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredUsers.map((item) => (
              <div
                key={item.id}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 600 }}>{item.name}</h4>
                    <span className={`badge ${item.role === 'seamstress' ? 'badge-primary' : item.role === 'client' ? 'badge-success' : 'badge-neutral'}`}>
                      {item.role === 'seamstress' ? 'Costureira / Ateliê' : item.role === 'client' ? 'Contratante' : 'Fornecedor'}
                    </span>
                    <span className={`badge ${item.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                      {item.status === 'active' ? 'Conta Ativa' : 'Suspensa'}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {item.company_name && <span>{item.company_name} · </span>}
                    <span>{item.email}</span> · <span>{item.phone}</span> · <span>{item.city}, {item.state}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => toggleUserStatus(item.id)}
                    className={`btn ${item.status === 'active' ? 'btn-danger' : 'btn-success'} btn-sm`}
                  >
                    {item.status === 'active' ? <><Ban size={13} /> Suspender</> : <><CheckCircle2 size={13} /> Reativar</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complaints and Moderation */}
        <div className="card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <AlertTriangle size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Central de Moderação & Prevenção Antigolpe</h3>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            O filtro automático do chat monitora e bloqueia trocas não autorizadas de contas bancárias externas para assegurar que toda a produção seja registrada e rastreável. Nenhuma denúncia de descumprimento de prazos pendente no momento.
          </p>
        </div>
      </div>
    </div>
  );
};
