import React, { useState } from 'react';
import { mockSuppliers } from '../../lib/mockData';
import { SupplierItem } from '../../lib/types';
import { Modal } from '../../components/ui/UIComponents';
import { 
  Store, 
  MapPin, 
  Star, 
  ShieldCheck, 
  MessageSquare, 
  Clock, 
  Package, 
  Send,
  Layers,
  Sparkles
} from 'lucide-react';

const categories = ['Todos', 'Tecidos', 'Máquinas', 'Aviamentos', 'Serviços'];

export const SuppliersPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [quoteModalSupplier, setQuoteModalSupplier] = useState<SupplierItem | null>(null);
  const [quoteForm, setQuoteForm] = useState({
    product_name: '',
    quantity: '100',
    details: ''
  });

  const filtered = mockSuppliers.filter(item => {
    if (selectedCategory === 'Todos') return true;
    return item.category === selectedCategory;
  });

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitação de cotação enviada com sucesso para ${quoteModalSupplier?.company_name}! O fornecedor responderá no seu e-mail e WhatsApp.`);
    setQuoteModalSupplier(null);
  };

  return (
    <div style={{ padding: '36px 0 72px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>
              Módulo 7 · Vitrine de Soluções Têxteis
            </span>
            <h1 style={{ fontSize: '28px', marginTop: '4px' }}>Fornecedores & Insumos Homologados</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
              Compre rolos de tecido, máquinas industriais, aviamentos e serviços de modelagem CAD diretamente das indústrias
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`chip ${selectedCategory === cat ? 'active' : ''}`}
              style={{ fontSize: '14px', padding: '8px 16px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Suppliers Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {filtered.map((item) => (
            <div key={item.id} className="card card-hover" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '170px' }}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--primary)'
                  }}
                >
                  {item.category}
                </span>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{item.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Star size={15} fill="#F5A623" color="#F5A623" />
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Store size={14} /> {item.company_name}
                  </p>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                    <MapPin size={13} /> {item.city}, {item.state} · {item.delivery_time}
                  </p>

                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {item.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Pedido mín: <strong>{item.min_order}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuoteModalSupplier(item)}
                    className="btn btn-primary btn-sm"
                  >
                    Solicitar Cotação
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Request Modal */}
      {quoteModalSupplier && (
        <Modal
          isOpen={true}
          onClose={() => setQuoteModalSupplier(null)}
          title={`Solicitar Cotação · ${quoteModalSupplier.company_name}`}
        >
          <form onSubmit={handleSendQuote}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="label">Produto ou Insumo de Interesse</label>
                <input
                  type="text"
                  required
                  className="input"
                  defaultValue={quoteModalSupplier.name}
                  onChange={(e) => setQuoteForm({ ...quoteForm, product_name: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Quantidade Desejada (metros, unidades ou lotes)</label>
                <input
                  type="text"
                  required
                  className="input"
                  defaultValue="Ex: 500 metros ou 10 unidades"
                  onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Detalhes técnicos ou cores / gramaturas</label>
                <textarea
                  className="textarea"
                  rows={3}
                  placeholder="Especifique cores, largura do tecido ou voltagem da máquina..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setQuoteModalSupplier(null)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Enviar Pedido de Cotação
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
