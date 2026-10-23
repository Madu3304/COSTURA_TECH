import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { mockSeamstresses } from '../../lib/mockData';
import { 
  Search, 
  MapPin, 
  Star, 
  SlidersHorizontal, 
  Map as MapIcon, 
  List, 
  ShieldCheck, 
  Check, 
  MessageSquare, 
  Scissors, 
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { currentRole } = useAuth();
  const navigate = useNavigate();

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Todos');
  const [selectedMachine, setSelectedMachine] = useState<string>('Todos');
  const [radiusKm, setRadiusKm] = useState<number>(50);
  const [minRating, setMinRating] = useState<number>(4.5);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('Todos');
  const [selectedTeamSize, setSelectedTeamSize] = useState<string>('Todos');
  const [selectedExperience, setSelectedExperience] = useState<string>('Todos');

  const filtered = mockSeamstresses.filter(s => {
    if (selectedSpecialty !== 'Todos' && !s.specialties.includes(selectedSpecialty)) return false;
    if (selectedMachine !== 'Todos' && !s.machines.includes(selectedMachine)) return false;
    if (selectedState !== 'Todos' && s.state !== selectedState) return false;
    if (s.rating < minRating) return false;

    // Filtro de Tamanho de Equipe (1, 2, 3 a 5, 6 a 10, mais de 10)
    if (selectedTeamSize !== 'Todos') {
      const team = s.workers_count;
      if (selectedTeamSize === '1' && team !== 1) return false;
      if (selectedTeamSize === '2' && team !== 2) return false;
      if (selectedTeamSize === '3-5' && (team < 3 || team > 5)) return false;
      if (selectedTeamSize === '6-10' && (team < 6 || team > 10)) return false;
      if (selectedTeamSize === 'mais-10' && team <= 10) return false;
    }

    // Filtro de Tempo de Experiência
    if (selectedExperience !== 'Todos') {
      const exp = s.experience_years;
      if (selectedExperience === 'ate-2' && exp > 2) return false;
      if (selectedExperience === '3-5' && (exp < 3 || exp > 5)) return false;
      if (selectedExperience === '6-10' && (exp < 6 || exp > 10)) return false;
      if (selectedExperience === 'mais-10' && exp <= 10) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.display_name.toLowerCase().includes(q) ||
        s.bio.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ padding: '32px 0 60px' }}>
      <div className="container">
        {/* Header section with Search Bar and View Mode Switcher */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px' }}>
                {currentRole === 'seamstress' ? 'Banco de Facções e Parcerias' : 'Buscar Costureiras e Facções'}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
                Banco nacional com verificação de maquinário e geolocalização por raio
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: 'var(--surface)',
                  padding: '4px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'grid' ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: viewMode === 'grid' ? 600 : 400,
                    cursor: 'pointer',
                    boxShadow: viewMode === 'grid' ? 'var(--shadow-card)' : 'none'
                  }}
                >
                  <List size={16} /> Lista
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: viewMode === 'map' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'map' ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: viewMode === 'map' ? 600 : 400,
                    cursor: 'pointer',
                    boxShadow: viewMode === 'map' ? 'var(--shadow-card)' : 'none'
                  }}
                >
                  <MapIcon size={16} /> Mapa
                </button>
              </div>
            </div>
          </div>

          {/* Quick Search Input */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="input"
              placeholder="Buscar por nome do ateliê, bairro, tipo de peça ou especialidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '42px', height: '48px', fontSize: '15px' }}
            />
            <Search
              size={20}
              color="var(--text-secondary)"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>
        </div>

        {/* Main Search Layout: Sidebar Filters + Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '28px', alignItems: 'start' }}>
          {/* Left Filter Sidebar */}
          <div
            className="card"
            style={{
              padding: '24px 18px 24px 24px',
              position: 'sticky',
              top: '90px',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--border) transparent'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <SlidersHorizontal size={18} color="var(--primary)" /> Filtros
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedSpecialty('Todos');
                  setSelectedMachine('Todos');
                  setSelectedState('Todos');
                  setSelectedTeamSize('Todos');
                  setSelectedExperience('Todos');
                  setRadiusKm(50);
                  setMinRating(4.5);
                }}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '12px', padding: '4px' }}
              >
                Limpar
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Tamanho da Equipe */}
              <div>
                <label className="label">Tamanho da Equipe</label>
                <select
                  className="select"
                  value={selectedTeamSize}
                  onChange={(e) => setSelectedTeamSize(e.target.value)}
                >
                  <option value="Todos">Todos os tamanhos</option>
                  <option value="1">1 costureira (Autônoma)</option>
                  <option value="2">2 costureiras</option>
                  <option value="3-5">3 a 5 costureiras</option>
                  <option value="6-10">6 a 10 costureiras</option>
                  <option value="mais-10">Mais de 10 costureiras</option>
                </select>
              </div>

              {/* Tempo de Experiência */}
              <div>
                <label className="label">Tempo de Experiência</label>
                <select
                  className="select"
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                >
                  <option value="Todos">Qualquer experiência</option>
                  <option value="ate-2">Até 2 anos</option>
                  <option value="3-5">3 a 5 anos</option>
                  <option value="6-10">6 a 10 anos</option>
                  <option value="mais-10">Mais de 10 anos</option>
                </select>
              </div>

              {/* Raio em km */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label className="label" style={{ marginBottom: 0 }}>Raio Máximo</label>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>{radiusKm} km</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={radiusKm}
                  onChange={(e) => setRadiusKm(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  <span>5 km</span>
                  <span>250 km</span>
                </div>
              </div>

              {/* Especialidade */}
              <div>
                <label className="label">Especialidade Têxtil</label>
                <select
                  className="select"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="Todos">Todas as Especialidades</option>
                  <option value="Jeans">Jeans / Sarja</option>
                  <option value="Malha">Malharia Circular</option>
                  <option value="Alfaiataria">Alfaiataria Fina</option>
                  <option value="Moda Praia">Moda Praia</option>
                  <option value="Infantil">Moda Infantil</option>
                </select>
              </div>

              {/* Maquinário Exigido */}
              <div>
                <label className="label">Maquinário Obrigatório</label>
                <select
                  className="select"
                  value={selectedMachine}
                  onChange={(e) => setSelectedMachine(e.target.value)}
                >
                  <option value="Todos">Qualquer Maquinário</option>
                  <option value="Travete eletrônico">Travete Eletrônico</option>
                  <option value="Overloque 5 fios">Overloque 5 Fios</option>
                  <option value="Galoneira">Galoneira</option>
                  <option value="Reta Industrial">Reta Industrial Direct Drive</option>
                </select>
              </div>

              {/* Estado UF */}
              <div>
                <label className="label">Estado (UF)</label>
                <select
                  className="select"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="Todos">Todo o Brasil</option>
                  <option value="SP">São Paulo (SP)</option>
                  <option value="SC">Santa Catarina (SC)</option>
                  <option value="PR">Paraná (PR)</option>
                  <option value="RS">Rio Grande do Sul (RS)</option>
                </select>
              </div>

              {/* Avaliação Mínima */}
              <div>
                <label className="label">Avaliação Mínima</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[4.0, 4.5, 4.8].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setMinRating(rate)}
                      className={`btn btn-sm ${minRating === rate ? 'btn-soft' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '4px' }}
                    >
                      ★ {rate}+
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area: Results */}
          <div>
            {viewMode === 'map' ? (
              <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} color="var(--primary)" />
                    <span style={{ fontWeight: 600 }}>Mapa de Proximidade (PostGIS Mock)</span>
                  </div>
                  <span className="badge badge-primary">{filtered.length} ateliês mapeados</span>
                </div>
                {/* Simulated Interactive Map */}
                <div
                  style={{
                    height: '480px',
                    backgroundColor: '#E6F2F0',
                    position: 'relative',
                    backgroundImage: 'radial-gradient(#B6D5D1 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* Pin 1 */}
                  <div
                    onClick={() => navigate('/costureiras/costureira-1')}
                    style={{
                      position: 'absolute',
                      top: '35%',
                      left: '42%',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '14px', fontSize: '11px', fontWeight: 600, boxShadow: 'var(--shadow-dropdown)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Scissors size={12} /> Ateliê Alinhavo (Brás - SP)
                    </div>
                    <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--primary)', transform: 'rotate(45deg)', marginTop: '-6px' }} />
                  </div>

                  {/* Pin 2 */}
                  <div
                    onClick={() => navigate('/costureiras/costureira-2')}
                    style={{
                      position: 'absolute',
                      top: '48%',
                      left: '52%',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '14px', fontSize: '11px', fontWeight: 600, boxShadow: 'var(--shadow-dropdown)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Scissors size={12} /> Moda Sul (Bom Retiro)
                    </div>
                    <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--primary)', transform: 'rotate(45deg)', marginTop: '-6px' }} />
                  </div>

                  {/* Pin 3 */}
                  <div
                    onClick={() => navigate('/costureiras/costureira-4')}
                    style={{
                      position: 'absolute',
                      top: '70%',
                      left: '38%',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div style={{ backgroundColor: 'var(--text-primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '14px', fontSize: '11px', fontWeight: 600, boxShadow: 'var(--shadow-dropdown)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Facção Vale Itajaí (SC)
                    </div>
                    <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--text-primary)', transform: 'rotate(45deg)', marginTop: '-6px' }} />
                  </div>

                  <div style={{ position: 'absolute', bottom: '16px', right: '16px', backgroundColor: 'rgba(255,255,255,0.92)', padding: '8px 12px', borderRadius: 'var(--radius-md)', fontSize: '12px', boxShadow: 'var(--shadow-card)' }}>
                    Clique no marcador para abrir o perfil da oficina
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <span>Exibindo <strong>{filtered.length}</strong> profissionais e facções verificadas</span>
                  <span>Ordenado por: Relevância & Avaliações</span>
                </div>

                {filtered.map((item) => (
                  <div key={item.id} className="card card-hover" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                      {/* Thumbnail or Avatar */}
                      <img
                        src={item.portfolio_photos[0]?.url || 'https://images.unsplash.com/photo-1542272604-780c96856592?w=300'}
                        alt={item.display_name}
                        style={{
                          width: '140px',
                          height: '140px',
                          borderRadius: 'var(--radius-md)',
                          objectFit: 'cover',
                          flexShrink: 0
                        }}
                      />

                      <div style={{ flex: 1, minWidth: '260px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{item.display_name}</h3>
                              {item.verified && (
                                <span className="badge badge-success" title="Documentos e Maquinário Auditados">
                                  <ShieldCheck size={13} /> Verificado
                                </span>
                              )}
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                              <span><MapPin size={14} color="var(--primary)" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '2px' }} />{item.city}, {item.state}</span>
                              <span>·</span>
                              <span>{item.workers_count === 1 ? '1 costureira (Autônoma)' : `${item.workers_count} costureiras na equipe`}</span>
                              <span>·</span>
                              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{item.experience_years} anos de experiência</span>
                            </p>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                              <Star size={16} fill="#F5A623" color="#F5A623" />
                              <span style={{ fontWeight: 700, fontSize: '15px' }}>{item.rating.toFixed(1)}</span>
                              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>({item.reviews_count})</span>
                            </div>
                          </div>
                        </div>

                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '12px 0', lineHeight: 1.5 }}>
                          {item.tagline}
                        </p>

                        {/* Badges for Specialties & Machines */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                          {item.specialties.map(spec => (
                            <span key={spec} className="badge badge-primary">{spec}</span>
                          ))}
                          {item.machines.slice(0, 3).map(mach => (
                            <span key={mach} className="badge badge-neutral">{mach}</span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            Capacidade: <strong>{item.capacity_month.toLocaleString('pt-BR')} peças/mês</strong> (Mín. {item.min_pieces} pçs)
                          </span>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Link to={`/costureiras/${item.id}`} className="btn btn-secondary btn-sm">
                              Ver Portfólio
                            </Link>
                            <Link to="/chat" className="btn btn-primary btn-sm">
                              <MessageSquare size={14} /> Conversar
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
