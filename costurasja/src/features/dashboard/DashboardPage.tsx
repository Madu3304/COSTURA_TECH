import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { mockOrders } from '../../lib/mockData';
import { 
  Package, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Calendar, 
  ArrowUpRight, 
  Scissors, 
  Building2, 
  Plus, 
  MessageSquare,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentRole, currentUser } = useAuth();

  return (
    <div style={{ padding: '36px 0 72px' }}>
      <div className="container">
        {/* Welcome Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>
              Painel de Controle
            </span>
            <h1 style={{ fontSize: '28px', marginTop: '4px' }}>
              Olá, {currentUser?.name || 'Gestor'}! 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
              {currentRole === 'seamstress' 
                ? 'Acompanhe a capacidade do seu ateliê e os lotes em confecção.'
                : 'Acompanhe o andamento das oficinas e a entrega das suas coleções.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/chat" className="btn btn-secondary">
              <MessageSquare size={16} /> Ver Chat
            </Link>
            <Link to={currentRole === 'seamstress' ? '/pedidos' : '/costureiras'} className="btn btn-primary">
              {currentRole === 'seamstress' ? 'Ver Meus Pedidos' : <><Plus size={16} /> Contratar Oficina</>}
            </Link>
          </div>
        </div>

        {/* 4 Key Indicators Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="text-muted text-xs font-semibold" style={{ textTransform: 'uppercase' }}>Pedidos Ativos</span>
                <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>3 lotes</div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={20} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--success)', marginTop: '12px' }}>
              <ArrowUpRight size={14} /> 100% dentro do cronograma
            </div>
          </div>

          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="text-muted text-xs font-semibold" style={{ textTransform: 'uppercase' }}>Peças no Mês</span>
                <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>1.630 pçs</div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scissors size={20} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              Meta do mês: 2.500 pçs (65%)
            </div>
          </div>

          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="text-muted text-xs font-semibold" style={{ textTransform: 'uppercase' }}>Prazo Médio Entrega</span>
                <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>14 dias</div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={20} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--success)', marginTop: '12px' }}>
              <CheckCircle2 size={14} /> 2 dias mais rápido que a média
            </div>
          </div>

          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="text-muted text-xs font-semibold" style={{ textTransform: 'uppercase' }}>
                  {currentRole === 'seamstress' ? 'Faturamento Estimado' : 'Investimento Terceirizado'}
                </span>
                <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px', color: 'var(--primary)' }}>
                  R$ 17.990
                </div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={20} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              Valores garantidos por pedido
            </div>
          </div>
        </div>

        {/* 2 Columns: Upcoming Deadlines + Active Production */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
          {/* Active Production List */}
          <div className="card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Lotes em Produção Ativa</h3>
              <Link to="/pedidos" className="btn btn-ghost btn-sm">Ver todos</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {mockOrders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)' }}>#{order.id}</span>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, marginTop: '2px' }}>{order.title}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {order.quantity} pçs · {order.seamstress_name}
                    </span>
                  </div>

                  <Link to={`/pedidos/${order.id}`} className="btn btn-secondary btn-sm">
                    Ver <ChevronRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines / Alerts */}
          <div className="card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <AlertTriangle size={20} color="var(--warning)" />
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Próximos Prazos de Entrega</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--warning-soft)',
                  border: '1px solid #F5E1AD'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#8A5E0B' }}>EM 8 DIAS (25/10)</span>
                  <span className="badge badge-warning">Em Transporte</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '4px', color: '#1F1B2D' }}>
                  1.200 T-Shirts Gola Careca Algodão Pima
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Oficina Moda Sul · Despacho em andamento
                </div>
              </div>

              <div
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)' }}>EM 24 DIAS (10/11)</span>
                  <span className="badge badge-primary">Em Produção</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '4px' }}>
                  400 Calças Jeans Slim Masculinas
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Ateliê Alinhavo & Arte · 1ª montagem concluída
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
