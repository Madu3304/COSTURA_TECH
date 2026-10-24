import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockOrders } from '../../lib/mockData';
import { OrderStatus } from '../../lib/types';
import { 
  Package, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Filter, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  FileText
} from 'lucide-react';

const statusTabs: { key: string; label: string }[] = [
  { key: 'all', label: 'Todos os Pedidos' },
  { key: 'orcamento', label: 'Orçamentos' },
  { key: 'aceito', label: 'Aceitos' },
  { key: 'em_producao', label: 'Em Produção' },
  { key: 'enviado', label: 'Enviados' },
  { key: 'entregue', label: 'Entregues' },
  { key: 'concluido', label: 'Concluídos' },
];

export const OrdersListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const navigate = useNavigate();

  const filteredOrders = mockOrders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'orcamento':
        return <span className="badge badge-warning">Aguardando Aprovação</span>;
      case 'aceito':
        return <span className="badge badge-primary">Acordo Confirmado</span>;
      case 'em_producao':
        return <span className="badge badge-primary">Em Produção Ativa</span>;
      case 'enviado':
        return <span className="badge badge-warning">Em Transporte</span>;
      case 'entregue':
        return <span className="badge badge-success">Entregue / Em Conferência</span>;
      case 'concluido':
        return <span className="badge badge-success">Concluído & Avaliado</span>;
      default:
        return <span className="badge badge-neutral">{status}</span>;
    }
  };

  return (
    <div style={{ padding: '36px 0 72px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '28px' }}>Gestão de Pedidos e Terceirização (RF14)</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
              Acompanhe cada etapa de fabricação, fichas técnicas e prazos acordados
            </p>
          </div>

          <button
            onClick={() => navigate('/costureiras')}
            className="btn btn-primary"
          >
            <Plus size={16} /> Novo Pedido / Orçamento
          </button>
        </div>

        {/* Status Tabs Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border)'
          }}
        >
          {statusTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Orders Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredOrders.length === 0 ? (
            <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
              <Package size={40} color="var(--text-secondary)" style={{ margin: '0 auto 12px' }} />
              <h3>Nenhum pedido nesta etapa</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
                Alterne entre as abas acima para conferir os demais pedidos em andamento.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="card card-hover"
                style={{
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}
              >
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)' }}>
                      #{order.id}
                    </span>
                    {getStatusBadge(order.status)}
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Criado em {order.created_at}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>
                    {order.title}
                  </h3>

                  <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                    <span>Oficina: <strong style={{ color: 'var(--text-primary)' }}>{order.seamstress_name}</strong></span>
                    <span>Tipo: <strong style={{ color: 'var(--text-primary)' }}>{order.piece_type}</strong></span>
                    <span>Qtd: <strong style={{ color: 'var(--text-primary)' }}>{order.quantity} peças</strong></span>
                  </div>
                </div>

                {/* Right side with price, due date and action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Valor Total</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      R$ {order.total_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      R$ {order.unit_price.toFixed(2)} / peça
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Prazo de Entrega</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)' }}>
                      <Calendar size={14} color="var(--primary)" /> {order.due_date}
                    </div>
                  </div>

                  <Link to={`/pedidos/${order.id}`} className="btn btn-secondary">
                    Ver Detalhes & Etapas <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
