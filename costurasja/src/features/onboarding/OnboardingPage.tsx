import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { 
  Scissors, 
  Upload, 
  Check, 
  Plus, 
  X, 
  Image as ImageIcon, 
  Sparkles, 
  ArrowRight,
  MapPin,
  Clock,
  Users
} from 'lucide-react';

const availableSpecialties = [
  'Jeans',
  'Sarja',
  'Malha',
  'Moda Praia',
  'Lingerie',
  'Alfaiataria',
  'Moda Infantil',
  'Fitness / Suplex',
  'Uniformes Profissionais',
  'Camisaria',
  'Moletom',
  'Linho'
];

const availableMachines = [
  'Reta Industrial',
  'Overloque 4 fios',
  'Overloque 5 fios',
  'Galoneira',
  'Travete Eletrônico',
  'Pespontadeira',
  'Caseadeira',
  'Botoneira',
  'Fechadeira de Braço',
  'Elastiqueira'
];

export const OnboardingPage: React.FC = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['Jeans', 'Sarja']);
  const [selectedMachines, setSelectedMachines] = useState<string[]>(['Reta Industrial', 'Overloque 4 fios', 'Travete Eletrônico']);
  const [capacity, setCapacity] = useState('2500');
  const [isWorkshop, setIsWorkshop] = useState(true);
  const [workersCount, setWorkersCount] = useState('4');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80'
  ]);

  const toggleSpecialty = (item: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleMachine = (item: string) => {
    setSelectedMachines(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSimulatedPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (photos.length < 20) {
      setPhotos([...photos, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80']);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole('seamstress');
    navigate('/costureiras/costureira-1');
  };

  return (
    <div style={{ padding: '48px 0 80px', backgroundColor: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>
            RF04 & RF05 · Perfil Profissional
          </span>
          <h1 style={{ fontSize: '30px', marginTop: '6px' }}>Configure o perfil do seu Ateliê / Oficina</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '6px' }}>
            Essas informações alimentam o mecanismo de busca dos contratantes e valorizam seu maquinário.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Especialidades */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label className="label" style={{ fontSize: '16px', fontWeight: 600, marginBottom: 0 }}>
                  1. Especialidades e Tipos de Peça
                </label>
                <span className="text-xs text-muted">Selecione todas que domina</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {availableSpecialties.map((spec) => {
                  const active = selectedSpecialties.includes(spec);
                  return (
                    <button
                      type="button"
                      key={spec}
                      onClick={() => toggleSpecialty(spec)}
                      className={`chip ${active ? 'active' : ''}`}
                    >
                      {active ? <Check size={14} /> : <Plus size={14} />}
                      {spec}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Maquinário */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label className="label" style={{ fontSize: '16px', fontWeight: 600, marginBottom: 0 }}>
                  2. Maquinário Disponível
                </label>
                <span className="text-xs text-muted">Crucial para contratantes filtrarem suas exigências</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {availableMachines.map((machine) => {
                  const active = selectedMachines.includes(machine);
                  return (
                    <button
                      type="button"
                      key={machine}
                      onClick={() => toggleMachine(machine)}
                      className={`chip ${active ? 'active' : ''}`}
                    >
                      {active ? <Check size={14} /> : <Plus size={14} />}
                      {machine}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Capacidade Produtiva e Equipe */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px' }}>
              <label className="label" style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
                3. Estrutura e Capacidade Mensal
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                <div>
                  <label className="label">Capacidade Estimada (peças/mês)</label>
                  <input
                    type="number"
                    className="input"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="Ex: 3000"
                  />
                </div>

                <div>
                  <label className="label">Tipo de Trabalho</label>
                  <select
                    className="select"
                    value={isWorkshop ? 'oficina' : 'autonoma'}
                    onChange={(e) => setIsWorkshop(e.target.value === 'oficina')}
                  >
                    <option value="oficina">Oficina / Facção com Equipe</option>
                    <option value="autonoma">Costureira Autônoma (Individual)</option>
                  </select>
                </div>

                {isWorkshop && (
                  <div>
                    <label className="label">Nº de Costureiras na Oficina</label>
                    <input
                      type="number"
                      className="input"
                      value={workersCount}
                      onChange={(e) => setWorkersCount(e.target.value)}
                      placeholder="Ex: 4"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Localização */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px' }}>
              <label className="label" style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
                4. Região de Atendimento
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div>
                  <label className="label">Cidade Polo</label>
                  <input
                    type="text"
                    className="input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Estado (UF)</label>
                  <select className="select" value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="SP">São Paulo (SP)</option>
                    <option value="SC">Santa Catarina (SC)</option>
                    <option value="MG">Minas Gerais (MG)</option>
                    <option value="RJ">Rio de Janeiro (RJ)</option>
                    <option value="GO">Goiás (GO)</option>
                    <option value="PE">Pernambuco (PE)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Portfólio de Fotos */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label className="label" style={{ fontSize: '16px', fontWeight: 600, marginBottom: 0 }}>
                  5. Fotos do Portfólio e Acabamento ({photos.length} de até 20 fotos)
                </label>
                <span className="badge badge-primary">Compressão Automática WebP</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                Mostre detalhes de costura, avessos, pespontos e peças prontas para impressionar as marcas.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
                {photos.map((url, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      height: '110px',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <img src={url} alt={`Portfólio ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: 'rgba(31, 27, 45, 0.75)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50%',
                        width: '22px',
                        height: '22px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                {photos.length < 20 && (
                  <label
                    style={{
                      height: '110px',
                      border: '2px dashed var(--border)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      backgroundColor: 'var(--surface)',
                      color: 'var(--text-secondary)',
                      fontSize: '12px'
                    }}
                  >
                    <Upload size={20} color="var(--primary)" />
                    <span>Adicionar Foto</span>
                    <input type="file" accept="image/*" onChange={handleSimulatedPhotoUpload} style={{ display: 'none' }} />
                  </label>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ minWidth: '220px' }}
              >
                Salvar Perfil e Visualizar <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
