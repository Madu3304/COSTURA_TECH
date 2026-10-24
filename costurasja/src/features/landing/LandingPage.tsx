import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { mockPlans } from '../../lib/mockData';
import heroMachineImg from '../../assets/hero-machine.jpg';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Award, 
  ArrowRight, 
  HelpCircle, 
  ChevronRight,
  TrendingUp,
  Users,
  Search,
  FileCheck,
  BarChart2,
  User,
  Download
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          padding: '60px 0 72px',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            alignItems: 'center',
            gap: '48px'
          }}
        >
          {/* Left Column: Headlines, Actions & Features */}
          <div style={{ maxWidth: '560px' }}>
            <h1
              style={{
                fontSize: '44px',
                fontWeight: 800,
                color: '#0E4D58',
                lineHeight: 1.18,
                marginBottom: '20px',
                letterSpacing: '-0.025em'
              }}
            >
              Sua produção têxtil em um novo nível
            </h1>

            <p
              style={{
                fontSize: '17px',
                color: '#4D6765',
                lineHeight: 1.6,
                marginBottom: '32px'
              }}
            >
              A plataforma que une confecções a oficinas de costura qualificadas. Acabe com a dependência de indicações e gerencie sua produção por <strong style={{ color: '#0E4D58', fontWeight: 700 }}>lances diretos</strong>.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    switchRole('client');
                    navigate('/cadastro?tipo=contratante');
                  }}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: '#166E77',
                    padding: '12px 24px',
                    fontSize: '15px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(22, 110, 119, 0.25)'
                  }}
                >
                  <BarChart2 size={18} /> Quero Contratar
                </button>

                <button
                  onClick={() => {
                    switchRole('seamstress');
                    navigate('/cadastro?tipo=costureira');
                  }}
                  className="btn btn-secondary"
                  style={{
                    padding: '12px 24px',
                    fontSize: '15px',
                    fontWeight: 500,
                    borderRadius: '8px',
                    borderColor: '#CBD5E1'
                  }}
                >
                  <User size={18} /> Quero Produzir
                </button>
              </div>

              <div>
                <button
                  onClick={() => {
                    alert('Em breve! O aplicativo Alinhava para Android e iOS estará disponível para download.');
                  }}
                  className="btn btn-secondary"
                  style={{
                    padding: '10px 22px',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '8px',
                    borderColor: '#CBD5E1'
                  }}
                >
                  <Download size={17} /> Baixar Aplicativo
                </button>
              </div>
            </div>

            {/* Feature Bullets */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'wrap',
                color: '#4D6765',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#166E77', display: 'inline-block' }} />
                Conexões verificadas
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#166E77', display: 'inline-block' }} />
                Sistema de avaliação
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#166E77', display: 'inline-block' }} />
                Chat seguro
              </div>
            </div>
          </div>

          {/* Right Column: Industrial Sewing Machine Hero Image */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '560px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -15px rgba(14, 77, 88, 0.22), 0 0 1px 1px rgba(0,0,0,0.05)',
                backgroundColor: '#EAF3F2'
              }}
            >
              <img
                src={heroMachineImg}
                alt="Máquina de Costura Industrial"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '420px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona em 3 Passos */}
      <section id="fluxo-seguro" style={{ padding: '72px 0', backgroundColor: 'var(--surface)', scrollMarginTop: '68px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Fluxo Seguro e Transparente
            </span>
            <h2 style={{ fontSize: '30px', marginTop: '6px' }}>Como a Alinhava Funciona em 3 Passos</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Do primeiro contato à conferência final de qualidade em uma única plataforma integrada.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Passo 1 */}
            <div className="card card-hover" style={{ padding: '32px', position: 'relative' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Search size={24} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>PASSO 01</span>
              <h3 style={{ fontSize: '20px', marginTop: '4px', marginBottom: '12px' }}>Busca com Filtros e Raio</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                Encontre oficinas e costureiras filtrando por especialidade (Jeans, Malha, Alfaiataria), maquinário específico, capacidade mensal e distância geográfica em km.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="card card-hover" style={{ padding: '32px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <FileCheck size={24} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>PASSO 02</span>
              <h3 style={{ fontSize: '20px', marginTop: '4px', marginBottom: '12px' }}>Ficha Técnica & Orçamento</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                Envie fotos de peças-piloto, ficha técnica em PDF e quantidades. A costureira analisa prazos, negocia no chat seguro com trava antigolpe e aceita a proposta.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="card card-hover" style={{ padding: '32px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <TrendingUp size={24} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>PASSO 03</span>
              <h3 style={{ fontSize: '20px', marginTop: '4px', marginBottom: '12px' }}>Produção Rastreável</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                Acompanhe o stepper das etapas em tempo real: Orçamento, Aceito, Em produção, Enviado, Entregue e Concluído. Ambas as partes avaliam a entrega mutuamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section id="planos" style={{ padding: '72px 0', backgroundColor: '#FFFFFF', scrollMarginTop: '68px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Planos Transparentes
            </span>
            <h2 style={{ fontSize: '30px', marginTop: '6px' }}>Planos para Marcas e Contratantes</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Gratuito para costureiras. Contratantes assinam para ter acesso completo ao chat e contatos diretos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '1080px', margin: '0 auto' }}>
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
                  boxShadow: plan.is_popular ? '0 8px 24px rgba(14, 116, 109, 0.15)' : 'var(--shadow-card)'
                }}
              >
                {plan.is_popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--primary)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      textTransform: 'uppercase'
                    }}
                  >
                    Mais Escolhido
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600 }}>{plan.name}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', minHeight: '38px' }}>
                    {plan.description}
                  </p>

                  <div style={{ margin: '20px 0', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>/mês</span>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '24px' }}>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', marginBottom: '10px' }}>
                        <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/planos"
                  className={`btn ${plan.is_popular ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%' }}
                >
                  Começar com {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA Petrol */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #0E4D58 0%, #166E77 100%)', color: '#FFFFFF' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <span
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#FFFFFF',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 600,
              display: 'inline-block',
              marginBottom: '20px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            Comunidade Têxtil Conectada
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#FFFFFF', marginBottom: '18px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Pronto para transformar sua produção têxtil?
          </h2>
          <p style={{ fontSize: '17px', color: '#D6ECE9', lineHeight: 1.6, marginBottom: '36px' }}>
            Conecte sua confecção ou ateliê a uma rede confiável com fichas técnicas padronizadas, prazos monitorados e negociações diretas sem intermediários.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                switchRole('client');
                navigate('/cadastro?tipo=contratante');
              }}
              className="btn"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#0E4D58',
                fontWeight: 700,
                padding: '14px 28px',
                fontSize: '15px',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.18)'
              }}
            >
              Quero Contratar Oficinas
            </button>
            <button
              onClick={() => {
                switchRole('seamstress');
                navigate('/cadastro?tipo=costureira');
              }}
              className="btn"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '14px 28px',
                fontSize: '15px',
                borderRadius: '8px'
              }}
            >
              Cadastrar Como Costureira (Grátis)
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="duvidas" style={{ padding: '72px 0', backgroundColor: 'var(--surface)', scrollMarginTop: '68px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px' }}>Perguntas Frequentes</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '6px' }}>
              Tire suas dúvidas sobre o funcionamento da plataforma Alinhava.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                q: 'O cadastro para costureiras e oficinas é gratuito?',
                a: 'Sim, 100% gratuito! Costureiras autônomas e oficinas não pagam mensalidade nem comissão sobre a produção. Apenas os contratantes assinam plano para liberar contatos e chat.'
              },
              {
                q: 'Como encontro a oficina ideal para minha demanda?',
                a: 'Você pode utilizar os filtros por tipo de peça (jeans, malha, alfaiataria), maquinário exigido, raio de distância em km e capacidade mensal. Todos os ateliês possuem fotos reais de portfólio e avaliações de outros clientes.'
              },
              {
                q: 'Como o sistema previne calotes e golpes?',
                a: 'Todos os pedidos possuem fluxo formal com ficha técnica, prazos e etapas rastreáveis. O chat possui filtro automático antigolpe que impede a divulgação indevida de dados fora do fluxo monitorado.'
              },
              {
                q: 'Posso usar no celular sem baixar aplicativo?',
                a: 'Sim! A Alinhava foi projetada como PWA mobile-first, com barra de navegação adaptada para celular e carregamento rápido até em conexões 4G.'
              }
            ].map((faq, index) => (
              <div key={index} className="card" style={{ padding: '20px 24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <HelpCircle size={18} color="var(--primary)" /> {faq.q}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px', paddingLeft: '28px', lineHeight: 1.5 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
