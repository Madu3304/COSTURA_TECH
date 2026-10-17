import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockSeamstresses } from '../../lib/mockData';
import { Modal } from '../../components/ui/UIComponents';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  Scissors, 
  Calendar, 
  Layers, 
  FileText, 
  CheckCircle2, 
  Upload, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

export const SeamstressProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const seamstress = mockSeamstresses.find(s => s.id === id) || mockSeamstresses[0];

  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    title: '',
    piece_type: 'Calça Jeans',
    quantity: '500',
    unit_price: '18.00',
    due_date: '2026-11-20',
    notes: ''
  });

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderModalOpen(false);
    alert('Pedido / Solicitação de orçamento enviada com sucesso! Redirecionando para a área de pedidos.');
    navigate('/pedidos');
  };

  return (
    <div style={{ backgroundColor: 'var(--surface)', paddingBottom: '80px' }}>
      {/* Light Cover Header */}
      <div
        style={{
          height: '200px',
          backgroundColor: '#EEE9FC',
          backgroundImage: 'linear-gradient(135deg, #F1EFF8 0%, #EEE9FC 100%)',
          borderBottom: '1px solid var(--border)',
          position: 'relative'
        }}
      />

      <div className="container" style={{ maxWidth: '1020px', marginTop: '-64px' }}>
        {/* Profile Card Header */}
        <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <img
                src={seamstress.portfolio_photos[0]?.url}
                alt={seamstress.display_name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 4px 12px rgba(31,27,45,0.08)'
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: 700 }}>{seamstress.display_name}</h1>
                  {seamstress.verified && (
                    <span className="badge badge-success">
                      <ShieldCheck size={14} /> Ateliê Auditado
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px', fontSize: '14px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={15} color="var(--primary)" /> {seamstress.city}, {seamstress.state}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Scissors size={15} color="var(--primary)" /> {seamstress.is_workshop ? `Oficina (${seamstress.workers_count} profissionais)` : 'Costureira Autônoma'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={15} fill="#F5A623" color="#F5A623" /> <strong>{seamstress.rating.toFixed(1)}</strong> ({seamstress.reviews_count} avaliações)
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/chat" className="btn btn-secondary">
                <MessageSquare size={16} /> Conversar no Chat
              </Link>
              <button
                type="button"
                onClick={() => setIsOrderModalOpen(true)}
                className="btn btn-primary"
              >
                Solicitar Orçamento
              </button>
            </div>
          </div>

          <p style={{ marginTop: '24px', fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.6, borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            {seamstress.bio}
          </p>
        </div>

        {/* 2-Columns Layout: Details & Machinery vs Portfolio */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
          {/* Left Column: Portfolio & Reviews */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Portfolio Grid */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Portfólio de Acabamento & Peças Prontas</h3>
                <span className="text-sm text-muted">{seamstress.portfolio_photos.length} fotos reais</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                {seamstress.portfolio_photos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setActivePhoto(photo.url)}
                    style={{
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: '8px 10px', fontSize: '12px', color: 'var(--text-secondary)', backgroundColor: '#FFFFFF' }}>
                      {photo.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avaliações */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Avaliações dos Contratantes (RF15)</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>Confecções Urbana S/A</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Outubro / 2026</span>
                  </div>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '6px' }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} fill="#F5A623" color="#F5A623" />
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    "Pontualidade impecável na entrega das 400 calças jeans. Acabamento do travete e pesponto idênticos à ficha técnica."
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>Jeanswear Brasil</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Setembro / 2026</span>
                  </div>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '6px' }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} fill="#F5A623" color="#F5A623" />
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    "Ótima comunicação no chat da Alinhava e rapidez nas peças de reposição."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Machinery & Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Capacidade e Faixa */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '14px' }}>Capacidade Produtiva</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Capacidade Mensal:</span>
                  <strong>{seamstress.capacity_month.toLocaleString('pt-BR')} peças</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Lote Mínimo:</span>
                  <strong>{seamstress.min_pieces} peças</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Média de Preço:</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{seamstress.price_range}</span>
                </div>
              </div>
            </div>

            {/* Maquinário Completo */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '14px' }}>Maquinário Disponível</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {seamstress.machines.map(m => (
                  <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <CheckCircle2 size={16} color="var(--primary)" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Especialidades */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '14px' }}>Especialidades</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {seamstress.specialties.map(s => (
                  <span key={s} className="badge badge-primary">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Order Request (RF12) */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title={`Solicitar Orçamento para ${seamstress.display_name}`}
        maxWidth="600px"
      >
        <form onSubmit={handleCreateOrder}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="label">Título do Pedido</label>
              <input
                type="text"
                required
                className="input"
                placeholder="Ex: Produção de 500 Bermudas Sarja"
                value={orderForm.title}
                onChange={(e) => setOrderForm({ ...orderForm, title: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="label">Tipo de Peça</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={orderForm.piece_type}
                  onChange={(e) => setOrderForm({ ...orderForm, piece_type: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Quantidade de Peças</label>
                <input
                  type="number"
                  required
                  className="input"
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="label">Valor Proposto por Peça (R$)</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={orderForm.unit_price}
                  onChange={(e) => setOrderForm({ ...orderForm, unit_price: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Prazo de Entrega Desejado</label>
                <input
                  type="date"
                  required
                  className="input"
                  value={orderForm.due_date}
                  onChange={(e) => setOrderForm({ ...orderForm, due_date: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label">Ficha Técnica e Fotos de Referência (PDF / ZIP)</label>
              <div
                style={{
                  border: '2px dashed var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  textAlign: 'center',
                  backgroundColor: 'var(--surface)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)'
                }}
              >
                <Upload size={22} color="var(--primary)" style={{ margin: '0 auto 6px' }} />
                <span>Clique para anexar Ficha Técnica com tabela de medidas</span>
              </div>
            </div>

            <div>
              <label className="label">Observações e Requisitos de Lavanderia / Aviamento</label>
              <textarea
                className="textarea"
                rows={3}
                placeholder="Informe se o tecido já virá cortado, se os aviamentos estão inclusos..."
                value={orderForm.notes}
                onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
              <button type="button" onClick={() => setIsOrderModalOpen(false)} className="btn btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Enviar Orçamento Formal
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Photo Zoom Modal */}
      {activePhoto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActivePhoto(null)}
        >
          <img
            src={activePhoto}
            alt="Zoom do Portfólio"
            style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
};
