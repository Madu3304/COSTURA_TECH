import React, { useState } from 'react';
import { mockConversations, mockMessages } from '../../lib/mockData';
import { ChatMessage } from '../../lib/types';
import { 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  FileText, 
  ShieldAlert, 
  CheckCheck, 
  Search, 
  ExternalLink,
  Lock,
  Download
} from 'lucide-react';

export const ChatPage: React.FC = () => {
  const [selectedConvId, setSelectedConvId] = useState<string>('conv-1');
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages['conv-1'] || []);
  const [inputText, setInputText] = useState('');
  const [antigolpeWarning, setAntigolpeWarning] = useState<string | null>(null);

  const activeConv = mockConversations.find(c => c.id === selectedConvId) || mockConversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // RF11: Bloqueio automático de dados de pagamento / contato externo (aviso antigolpe)
    const sensitiveRegex = /(pix|chave|deposito|transferencia|banco|agencia|conta corrente|ted|doc|cpf|0\d{10}|\d{11})/i;
    if (sensitiveRegex.test(inputText)) {
      setAntigolpeWarning(
        'Aviso de Segurança Alinhava (RF11): Para sua segurança e proteção contra calotes, não compartilhe chaves PIX ou contas bancárias no chat. Todos os pagamentos e pedidos devem ser registrados pela plataforma para garantia de entrega e mediação.'
      );
    } else {
      setAntigolpeWarning(null);
    }

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversation_id: selectedConvId,
      sender_id: 'user-client-1',
      sender_name: 'Você',
      body: inputText,
      created_at: 'Agora'
    };

    setMessages([...messages, newMsg]);
    setInputText('');
  };

  const handleSendSimulatedAttachment = () => {
    const attachMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversation_id: selectedConvId,
      sender_id: 'user-client-1',
      sender_name: 'Você',
      body: 'Segue em anexo a ficha técnica atualizada com a gradação de medidas P, M, G.',
      attachment_name: 'Ficha_Tecnica_Gradacao_Final.pdf',
      attachment_type: 'pdf',
      attachment_url: '#',
      created_at: 'Agora'
    };
    setMessages([...messages, attachMsg]);
  };

  return (
    <div style={{ backgroundColor: 'var(--surface)', padding: '24px 0' }}>
      <div className="container" style={{ maxWidth: '1180px' }}>
        {/* Anti-golpe Permanent Top Security Banner (RF11) */}
        <div
          className="alert alert-warning"
          style={{
            marginBottom: '16px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={20} color="var(--warning)" style={{ flexShrink: 0 }} />
            <span>
              <strong>Ambiente Protegido Antigolpe (RF11):</strong> Nunca realize pagamentos por fora ou envie chaves bancárias diretamente. Mantenha os acordos registrados nesta conversa para suporte e proteção jurídica.
            </span>
          </div>
          <span className="badge badge-warning" style={{ flexShrink: 0 }}>Canal Criptografado</span>
        </div>

        {/* Chat Window Container */}
        <div
          className="card"
          style={{
            padding: 0,
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            height: '660px',
            overflow: 'hidden'
          }}
        >
          {/* Left Sidebar: Conversations List */}
          <div style={{ borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Mensagens</h3>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Buscar conversa..."
                  className="input"
                  style={{ fontSize: '13px', paddingLeft: '34px', height: '36px' }}
                />
                <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {mockConversations.map((conv) => {
                const isSelected = conv.id === selectedConvId;
                return (
                  <div
                    key={conv.id}
                    onClick={() => {
                      setSelectedConvId(conv.id);
                      setMessages(mockMessages[conv.id] || []);
                    }}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '14px 16px',
                      borderBottom: '1px solid var(--border)',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? 'var(--primary-soft)' : '#FFFFFF',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    <img
                      src={conv.participant_avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}
                      alt={conv.participant_name}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {conv.participant_name.split('(')[0]}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{conv.last_message_at}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                        {conv.last_message}
                      </p>
                      {conv.unread_count > 0 && (
                        <span className="badge badge-primary" style={{ padding: '2px 6px', fontSize: '10px', marginTop: '4px' }}>
                          {conv.unread_count} nova
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Area: Active Chat */}
          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--surface)' }}>
            {/* Chat Header */}
            <div
              style={{
                padding: '14px 20px',
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={activeConv.participant_avatar}
                  alt={activeConv.participant_name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600 }}>{activeConv.participant_name}</h4>
                  <span style={{ fontSize: '12px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
                    Online agora
                  </span>
                </div>
              </div>

              {activeConv.order_id && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-neutral">Pedido #{activeConv.order_id}</span>
                  <a href={`/pedidos/${activeConv.order_id}`} className="btn btn-secondary btn-sm">
                    Ver Pedido <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>

            {/* Messages Scroll Area */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {messages.map((msg) => {
                const isMe = msg.sender_id === 'user-client-1';
                return (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: isMe ? 'flex-end' : 'flex-start',
                      maxWidth: '75%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isMe ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                        backgroundColor: isMe ? 'var(--primary)' : '#FFFFFF',
                        color: isMe ? '#FFFFFF' : 'var(--text-primary)',
                        boxShadow: 'var(--shadow-card)',
                        fontSize: '14px',
                        lineHeight: 1.45
                      }}
                    >
                      <p>{msg.body}</p>

                      {/* Attachment preview if any */}
                      {msg.attachment_url && (
                        <div style={{ marginTop: '10px' }}>
                          {msg.attachment_type === 'image' ? (
                            <img
                              src={msg.attachment_url}
                              alt="Anexo"
                              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                          ) : (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                backgroundColor: isMe ? 'rgba(255,255,255,0.15)' : 'var(--surface)',
                                color: isMe ? '#FFFFFF' : 'var(--text-primary)',
                                fontSize: '13px'
                              }}
                            >
                              <FileText size={18} />
                              <span style={{ flex: 1, textDecoration: 'underline' }}>{msg.attachment_name}</span>
                              <Download size={14} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {msg.created_at} {isMe && <CheckCheck size={13} color="var(--primary)" />}
                    </span>
                  </div>
                );
              })}

              {/* In-chat dynamic warning notice when triggered */}
              {antigolpeWarning && (
                <div className="alert alert-danger" style={{ fontSize: '13px', margin: '10px 0' }}>
                  <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                  <span>{antigolpeWarning}</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: '14px 20px',
                backgroundColor: '#FFFFFF',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <button
                type="button"
                onClick={handleSendSimulatedAttachment}
                title="Anexar Ficha Técnica ou Foto"
                className="btn btn-ghost btn-sm"
                style={{ padding: '8px' }}
              >
                <Paperclip size={18} />
              </button>

              <input
                type="text"
                className="input"
                placeholder="Escreva sua mensagem com clareza sobre cortes, costuras ou prazos..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ flex: 1 }}
              />

              <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px' }}>
                <Send size={16} /> Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
