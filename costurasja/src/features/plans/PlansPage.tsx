import React, { useState } from 'react';
import { mockPlans } from '../../lib/mockData';
import { Modal } from '../../components/ui/UIComponents';
import { 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Sparkles, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const PlansPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('plan-quarterly');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const currentPlan = mockPlans.find(p => p.id === selectedPlan) || mockPlans[1];

  const handleConfirmSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutSuccess(true);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setCheckoutSuccess(false);
      alert('Assinatura ativada com sucesso! Seu selo de Contratante Verificado e acesso total ao chat foram liberados.');
    }, 1500);
  };

  return (
    <div style={{ padding: '48px 0 80px', backgroundColor: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>
            Planos de Acesso Contratante (RF16)
          </span>
          <h1 style={{ fontSize: '32px', marginTop: '6px' }}>
            Acesso Direto às Melhores Oficinas de Costura
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
            Costureiras usam a plataforma gratuitamente. Contratantes assinam para liberar contatos, chat ilimitado e gestão de pedidos.
          </p>
        </div>

        {/* 3 Plans Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {mockPlans.map((plan) => (
            <div
              key={plan.id}
              className="card"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: plan.is_popular ? '2px solid var(--primary)' : '1px solid var(--border)',
                boxShadow: plan.is_popular ? '0 8px 24px rgba(124, 92, 219, 0.12)' : 'var(--shadow-card)',
                padding: '32px'
              }}
            >
              {plan.is_popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-13px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 14px',
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Mais Escolhido (Economia 22%)
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700 }}>{plan.name}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '6px', minHeight: '40px' }}>
                  {plan.description}
                </p>

                <div style={{ margin: '24px 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>/mês</span>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px' }}>
                      <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedPlan(plan.id);
                  setIsCheckoutOpen(true);
                }}
                className={`btn ${plan.is_popular ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                style={{ width: '100%' }}
              >
                Assinar {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* Security badge and payment guarantee */}
        <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
            <ShieldCheck size={24} color="var(--primary)" />
            <span>Pagamento Seguro via Mercado Pago / Asaas</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
            <QrCode size={24} color="var(--success)" />
            <span>Liberação Imediata no PIX</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
            <CreditCard size={24} color="var(--primary)" />
            <span>Cartão de Crédito em até 12x</span>
          </div>
        </div>
      </div>

      {/* Checkout Modal (RF16) */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title={`Finalizar Assinatura · ${currentPlan.name}`}
      >
        {checkoutSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--success-soft)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3>Assinatura Confirmada!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
              Processando liberação do seu plano...
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmSubscription}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ backgroundColor: 'var(--surface)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>{currentPlan.name}</span>
                  <strong style={{ fontSize: '18px', color: 'var(--primary)' }}>
                    R$ {currentPlan.price.toFixed(2).replace('.', ',')} / mês
                  </strong>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Cobrança recorrente com cancelamento simples a qualquer momento.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="label">Forma de Pagamento</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`btn ${paymentMethod === 'pix' ? 'btn-soft' : 'btn-secondary'}`}
                    style={{ border: paymentMethod === 'pix' ? '2px solid var(--primary)' : '1px solid var(--border)' }}
                  >
                    <QrCode size={16} /> PIX (Aprovação Instantânea)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`btn ${paymentMethod === 'card' ? 'btn-soft' : 'btn-secondary'}`}
                    style={{ border: paymentMethod === 'card' ? '2px solid var(--primary)' : '1px solid var(--border)' }}
                  >
                    <CreditCard size={16} /> Cartão de Crédito
                  </button>
                </div>
              </div>

              {paymentMethod === 'pix' ? (
                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ width: '140px', height: '140px', backgroundColor: '#FFFFFF', border: '1px solid var(--border)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <QrCode size={100} color="var(--text-primary)" />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    QR Code gerado com validade de 30 minutos.
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label className="label">Número do Cartão</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="input" defaultValue="4532 •••• •••• 8912" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label className="label">Validade</label>
                      <input type="text" placeholder="MM/AA" className="input" defaultValue="12/28" />
                    </div>
                    <div>
                      <label className="label">CVV</label>
                      <input type="text" placeholder="123" className="input" defaultValue="789" />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsCheckoutOpen(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirmar e Ativar Plano
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
