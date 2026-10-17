import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockOrders } from '../../lib/mockData';
import { OrderStatus } from '../../lib/types';
import { Modal } from '../../components/ui/UIComponents';
import { 
  Package, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Download, 
  MessageSquare, 
  Star, 
  AlertCircle,
  TrendingUp,
  User,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const stepsOrder: { status: OrderStatus; label: string }[] = [
  { status: 'orcamento', label: 'Orçamento' },
  { status: 'aceito', label: 'Aceito' },
  { status: 'em_producao', label: 'Em Produção' },
  { status: 'enviado', label: 'Enviado' },
  { status: 'entregue', label: 'Entregue' },
  { status: 'pago', label: 'Pago' },
  { status: 'concluido', label: 'Concluído' }
];

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const initialOrder = mockOrders.find(o => o.id === id) || mockOrders[0];
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(initialOrder.status);
  const [events, setEvents] = useState(initialOrder.events);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const currentStepIndex = stepsOrder.findIndex(s => s.status === currentStatus);

  const handleAdvanceStep = () => {
    if (currentStepIndex < stepsOrder.length - 1) {
      const nextStep = stepsOrder[currentStepIndex + 1];
      setCurrentStatus(nextStep.status);
      const newEvent = {
        id: `ev-${Date.now()}`,
        order_id: initialOrder.id,
        from_status: currentStatus,
        to_status: nextStep.status,
        note: `Etapa avançada com sucesso para: ${nextStep.label}.`,
        actor_name: 'Usuário Ativo',
        actor_role: 'Participante',
        created_at: 'Agora mesmo'
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleCompleteReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReviewModalOpen(false);
    alert('Avaliação de 5 estrelas registrada no perfil da parceira!');
  };

  return (
    <div style={{ padding: '32px 0 80px', backgroundColor: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '1040px' }}>
        {/* Back navigation */}
        <Link to="/pedidos" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', marginBottom: '20px' }}>
          <ArrowLeft size={16} /> Voltar para Lista de Pedidos
        </Link>

        {/* Top Order Overview Card */}
        <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-primary">Pedido #{initialOrder.id}</span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Criado em {initialOrder.created_at}</span>
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 700 }}>{initialOrder.title}</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
                Contratante: <strong>{initialOrder.client_company}</strong> · Oficina Executora: <strong>{initialOrder.seamstress_name}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/chat" className="btn btn-secondary">
                <MessageSquare size={16} /> Chat do Pedido
              </Link>

              {currentStatus !== 'concluido' ? (
                <button
                  type="button"
                  onClick={handleAdvanceStep}
                  className="btn btn-primary"
                >
                  Avançar para Próxima Etapa <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="btn btn-primary"
                >
                  <Star size={16} fill="#FFFFFF" /> Avaliar Entrega (RF15)
                </button>
              )}
            </div>
          </div>

          {/* Stepper Visual (RF14) */}
          <div style={{ marginTop: '40px', marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '12px' }}>
              Rastreamento de Etapas de Produção (RF14)
            </div>

            <div className="stepper-container">
              <div className="stepper-progress-bg" />
              <div
                className="stepper-progress-fill"
                style={{
                  width: `${(currentStepIndex / (stepsOrder.length - 1)) * 95}%`
                }}
              />

              {stepsOrder.map((step, idx) => {
                const isCompleted = idx < currentStepIndex;
                const isActive = idx === currentStepIndex;

                return (
                  <div
                    key={step.status}
                    className={`stepper-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                  >
                    <div className="stepper-node">
                      {isCompleted ? <CheckCircle2 size={18} /> : idx + 1}
                    </div>
                    <span className="stepper-label">{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2 Columns: Order Details & Tech Sheet vs Event History */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
          {/* Left Column: Specifics & Tech Sheet */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}>Especificações da Confecção</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: 'var(--surface)', padding: '12px', borderRadius: '8px' }}>
                  <span className="text-muted" style={{ display: 'block', fontSize: '12px' }}>Tipo de Peça</span>
                  <strong>{initialOrder.piece_type}</strong>
                </div>
                <div style={{ backgroundColor: 'var(--surface)', padding: '12px', borderRadius: '8px' }}>
                  <span className="text-muted" style={{ display: 'block', fontSize: '12px' }}>Quantidade Total</span>
                  <strong>{initialOrder.quantity} unidades</strong>
                </div>
                <div style={{ backgroundColor: 'var(--surface)', padding: '12px', borderRadius: '8px' }}>
                  <span className="text-muted" style={{ display: 'block', fontSize: '12px' }}>Preço Unitário</span>
                  <strong>R$ {initialOrder.unit_price.toFixed(2)}</strong>
                </div>
                <div style={{ backgroundColor: 'var(--surface)', padding: '12px', borderRadius: '8px' }}>
                  <span className="text-muted" style={{ display: 'block', fontSize: '12px' }}>Valor Total</span>
                  <strong style={{ color: 'var(--primary)', fontSize: '16px' }}>
                    R$ {initialOrder.total_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </strong>
                </div>
              </div>

              {initialOrder.notes && (
                <div style={{ marginBottom: '20px' }}>
                  <label className="label">Observações de Produção:</label>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', backgroundColor: 'var(--surface)', padding: '12px', borderRadius: '8px', lineHeight: 1.5 }}>
                    {initialOrder.notes}
                  </p>
                </div>
              )}

              {/* Ficha Técnica Anexa */}
              <div>
                <label className="label">Ficha Técnica e Medidas Homologadas</label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)' }}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>{initialOrder.tech_sheet_name || 'Ficha_Tecnica_Producao.pdf'}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>PDF com medidas, costuras e aviamentos (1.8 MB)</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Download da ficha técnica iniciado.')}
                    className="btn btn-secondary btn-sm"
                  >
                    <Download size={14} /> Baixar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Historical Events Timeline */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '20px' }}>Histórico de Eventos & Mudança de Etapa</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
              {events.map((ev, index) => (
                <div key={ev.id} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                  {/* Timeline bullet */}
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      marginTop: '6px',
                      flexShrink: 0
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>{ev.actor_name} ({ev.actor_role})</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{ev.created_at}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                      {ev.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal (RF15) */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Avaliação Mútua de Conclusão (RF15)"
      >
        <form onSubmit={handleCompleteReview}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Como foi a qualidade do acabamento, pontualidade e comunicação?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setRating(s)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <Star
                    size={32}
                    fill={s <= rating ? '#F5A623' : 'transparent'}
                    color={s <= rating ? '#F5A623' : 'var(--border)'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="label">Comentário Público no Perfil</label>
            <textarea
              className="textarea"
              rows={4}
              required
              placeholder="Descreva a qualidade das costuras, respeito aos prazos e padronização..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={() => setIsReviewModalOpen(false)} className="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Publicar Avaliação
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
