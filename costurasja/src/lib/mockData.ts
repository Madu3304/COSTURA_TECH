import { SeamstressProfile, Order, Conversation, ChatMessage, Plan, SupplierItem, User, PlatformUserItem } from './types';

export const mockUsers: Record<string, User> = {
  seamstress: {
    id: 'user-seamstress-1',
    name: 'Dona Maria de Lourdes',
    email: 'maria.costuras@gmail.com',
    phone: '(11) 98765-4321',
    role: 'seamstress',
    is_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    company_name: 'Ateliê Alinhavo & Arte',
  },
  client: {
    id: 'user-client-1',
    name: 'Carlos Drummond',
    email: 'carlos@modaurbana.com.br',
    phone: '(11) 97123-8899',
    role: 'client',
    is_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    company_name: 'Confecções Urbana S/A',
    cnpj: '18.234.567/0001-89',
    plan_id: 'plan-quarterly'
  },
  supplier: {
    id: 'user-supplier-1',
    name: 'Roberto Valente',
    email: 'comercial@texbras.com.br',
    phone: '(11) 91234-5678',
    role: 'supplier',
    is_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    company_name: 'TexBrás Tecidos & Aviamentos',
    cnpj: '24.981.332/0001-44'
  },
  admin: {
    id: 'user-admin-1',
    name: 'Gestão da Plataforma',
    email: 'admin@alinhava.com.br',
    phone: '(11) 3322-1000',
    role: 'admin',
    is_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    company_name: 'Alinhava Plataforma'
  }
};

export const mockSeamstresses: SeamstressProfile[] = [
  {
    id: 'costureira-1',
    user_id: 'user-seamstress-1',
    display_name: 'Ateliê Alinhavo & Arte (Maria Lourdes)',
    tagline: 'Especialista em Jeans, Sarja e Bolsos embutidos com 18 anos de experiência',
    bio: 'Oficina estruturada no Brás com equipe de 4 profissionais especializadas em jeans pesado, jaquetas, bermudas e acabamento premium com pesponto duplo e travete industrial.',
    city: 'São Paulo',
    state: 'SP',
    lat: -23.5365,
    lng: -46.6180,
    rating: 4.9,
    reviews_count: 38,
    capacity_month: 2500,
    is_workshop: true,
    workers_count: 4,
    experience_years: 18,
    min_pieces: 50,
    verified: true,
    price_range: 'R$ 14 - R$ 28 / peça',
    specialties: ['Jeans', 'Sarja', 'Alfaiataria', 'Uniformes'],
    machines: ['Reta Industrial', 'Overloque 4 fios', 'Galoneira', 'Travete eletrônico', 'Pespontadeira'],
    portfolio_photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80', caption: 'Calça jeans tradicional com acabamento triplo' },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80', caption: 'Jaqueta jeans com forro flanelado' },
      { id: 'p3', url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80', caption: 'Detalhe de bolso faca e travete reforçado' }
    ]
  },
  {
    id: 'costureira-2',
    user_id: 'user-seamstress-2',
    display_name: 'Oficina Moda Sul (Rosana Silva)',
    tagline: 'Produção rápida em Malha, Linho e Moda Praia com corte e costura',
    bio: 'Oficina localizada no Bom Retiro com maquinário moderno de alta rotação. Atendemos marcas de moda jovem e feminina com excelente padronização de tamanhos e etiquetas.',
    city: 'São Paulo',
    state: 'SP',
    lat: -23.5288,
    lng: -46.6402,
    rating: 4.8,
    reviews_count: 52,
    capacity_month: 4000,
    is_workshop: true,
    workers_count: 6,
    experience_years: 7,
    min_pieces: 100,
    verified: true,
    price_range: 'R$ 8 - R$ 18 / peça',
    specialties: ['Malha', 'Moda Praia', 'Vestidos', 'Fitness'],
    machines: ['Overloque 5 fios', 'Galoneira aberta', 'Reta Direct Drive', 'Elastiqueira'],
    portfolio_photos: [
      { id: 'p4', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80', caption: 'Vestido midi em canelado com fenda' },
      { id: 'p5', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80', caption: 'Conjunto fitness suplex poliamida' }
    ]
  },
  {
    id: 'costureira-3',
    user_id: 'user-seamstress-3',
    display_name: 'Clara Mendes Alfaiataria',
    tagline: 'Alta costura e alfaiataria fina feminina e masculina',
    bio: 'Profissional autônoma com mais de 25 anos no mercado de luxo. Perfeita para produções sob medida ou lotes reduzidos com exigência rigorosa de acabamentos invisíveis.',
    city: 'Campinas',
    state: 'SP',
    lat: -22.9099,
    lng: -47.0626,
    rating: 5.0,
    reviews_count: 19,
    capacity_month: 400,
    is_workshop: false,
    workers_count: 1,
    experience_years: 25,
    min_pieces: 10,
    verified: true,
    price_range: 'R$ 45 - R$ 90 / peça',
    specialties: ['Alfaiataria', 'Blazers', 'Camisaria', 'Linho'],
    machines: ['Reta Eletrônica Jack', 'Overloque ponto cadeia', 'Caseadeira'],
    portfolio_photos: [
      { id: 'p6', url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80', caption: 'Blazer estruturado em crepe de lã com forro acetinado' },
      { id: 'p7', url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80', caption: 'Camisa social clássica com colarinho dublado' }
    ]
  },
  {
    id: 'costureira-4',
    user_id: 'user-seamstress-4',
    display_name: 'Facção Vale do Itajaí (Tereza & Filhas)',
    tagline: 'Grande escala em Moda Infantil e Pijamas com entrega expressa',
    bio: 'Oficina familiar com 8 costureiras experientes. Capacidade para atender pedidos de 5.000 a 8.000 peças/mês com controle rigoroso de qualidade e selo ABVTEX.',
    city: 'Blumenau',
    state: 'SC',
    lat: -26.9194,
    lng: -49.0661,
    rating: 4.9,
    reviews_count: 64,
    capacity_month: 7500,
    is_workshop: true,
    workers_count: 8,
    experience_years: 14,
    min_pieces: 200,
    verified: true,
    price_range: 'R$ 6 - R$ 14 / peça',
    specialties: ['Infantil', 'Pijamas', 'Malha', 'Moletom'],
    machines: ['Overloque 4 fios', 'Galoneira', 'Reta Industrial', 'Travete', 'Fechadeira'],
    portfolio_photos: [
      { id: 'p8', url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80', caption: 'Macacão infantil em algodão egípcio' },
      { id: 'p9', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80', caption: 'Conjunto moletom flanelado estampado' }
    ]
  },
  {
    id: 'costureira-5',
    user_id: 'user-seamstress-5',
    display_name: 'Cianorte Denim Facção (PR)',
    tagline: 'Polo do Jeans: produção pesada e lavagens especiais',
    bio: 'Oficina com 12 costureiras em Cianorte/PR. Alta capacidade produtiva em calças, jaquetas e bermudas jeans com acabamento industrial rigoroso.',
    city: 'Cianorte',
    state: 'PR',
    lat: -23.6633,
    lng: -52.6075,
    rating: 4.9,
    reviews_count: 47,
    capacity_month: 9000,
    is_workshop: true,
    workers_count: 12,
    experience_years: 10,
    min_pieces: 150,
    verified: true,
    price_range: 'R$ 12 - R$ 22 / peça',
    specialties: ['Jeans', 'Sarja', 'Bermudas', 'Jaquetas'],
    machines: ['Reta Industrial', 'Overloque 5 fios', 'Travete eletrônico', 'Pespontadeira'],
    portfolio_photos: [
      { id: 'p10', url: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80', caption: 'Calça jeans tradicional reforçada' }
    ]
  },
  {
    id: 'costureira-6',
    user_id: 'user-seamstress-6',
    display_name: 'Malharia Serra Gaúcha (Farroupilha - RS)',
    tagline: 'Especialista em Malhas Retilíneas, Tricot e Moletons de Inverno',
    bio: 'Ateliê tradicional da serra gaúcha especializado em peças encorpadas, golas polo, tricots finos e acabamentos de alfaiataria em malha.',
    city: 'Farroupilha',
    state: 'RS',
    lat: -29.2244,
    lng: -51.3486,
    rating: 5.0,
    reviews_count: 31,
    capacity_month: 3200,
    is_workshop: true,
    workers_count: 5,
    experience_years: 5,
    min_pieces: 50,
    verified: true,
    price_range: 'R$ 18 - R$ 38 / peça',
    specialties: ['Malha', 'Moletom', 'Casacos', 'Linho'],
    machines: ['Overloque 4 fios', 'Galoneira', 'Reta Eletrônica Jack', 'Travete'],
    portfolio_photos: [
      { id: 'p11', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80', caption: 'Casaco em malha canelada pesada' }
    ]
  },
  {
    id: 'costureira-7',
    user_id: 'user-seamstress-7',
    display_name: 'Duo Costuras Criativas (Ana & Bia)',
    tagline: 'Dupla dinâmica para pequenas coleções e prototipagem rápida',
    bio: 'Ateliê moderno de 2 costureiras focado em moda jovem, consertos finos e lotes piloto em tecidos leves.',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4284,
    lng: -49.2733,
    rating: 4.7,
    reviews_count: 14,
    capacity_month: 600,
    is_workshop: true,
    workers_count: 2,
    experience_years: 2,
    min_pieces: 20,
    verified: true,
    price_range: 'R$ 20 - R$ 35 / peça',
    specialties: ['Vestidos', 'Linho', 'Moda Praia'],
    machines: ['Reta Industrial', 'Overloque 4 fios'],
    portfolio_photos: [
      { id: 'p12', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80', caption: 'Peça piloto vestido viscose estampada' }
    ]
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ped-2026-089',
    client_id: 'user-client-1',
    client_name: 'Carlos Drummond',
    client_company: 'Confecções Urbana S/A',
    seamstress_id: 'costureira-1',
    seamstress_name: 'Ateliê Alinhavo & Arte (Maria Lourdes)',
    title: 'Produção de 400 Calças Jeans Slim Masculinas',
    piece_type: 'Calça Jeans Slim Fit (Sarja 12oz)',
    quantity: 400,
    unit_price: 18.50,
    total_price: 7400.00,
    due_date: '2026-11-10',
    created_at: '2026-10-14',
    status: 'em_producao',
    tech_sheet_name: 'Ficha_Tecnica_Calca_Slim_Urbana_v2.pdf',
    tech_sheet_url: '#',
    notes: 'Linha de pesponto cor ocre contrastante. Lavanderia e corte já realizados pelo contratante.',
    events: [
      {
        id: 'ev-1',
        order_id: 'ped-2026-089',
        to_status: 'orcamento',
        note: 'Orçamento enviado com ficha técnica e especificações de 400 unidades.',
        actor_name: 'Carlos Drummond',
        actor_role: 'Contratante',
        created_at: '14/10/2026 10:15'
      },
      {
        id: 'ev-2',
        order_id: 'ped-2026-089',
        from_status: 'orcamento',
        to_status: 'aceito',
        note: 'Orçamento aprovado e prazos acordados com a oficina.',
        actor_name: 'Dona Maria de Lourdes',
        actor_role: 'Costureira',
        created_at: '14/10/2026 14:30'
      },
      {
        id: 'ev-3',
        order_id: 'ped-2026-089',
        from_status: 'aceito',
        to_status: 'em_producao',
        note: 'Lote de tecido cortado e aviamentos recebidos no ateliê. Início da costura.',
        actor_name: 'Dona Maria de Lourdes',
        actor_role: 'Costureira',
        created_at: '16/10/2026 08:00'
      }
    ]
  },
  {
    id: 'ped-2026-074',
    client_id: 'user-client-1',
    client_name: 'Carlos Drummond',
    client_company: 'Confecções Urbana S/A',
    seamstress_id: 'costureira-2',
    seamstress_name: 'Oficina Moda Sul (Rosana Silva)',
    title: 'Lote 1.200 T-Shirts Gola Careca Algodão Pima',
    piece_type: 'Camisetas Básicas Masculinas e Femininas',
    quantity: 1200,
    unit_price: 7.20,
    total_price: 8640.00,
    due_date: '2026-10-25',
    created_at: '2026-09-28',
    status: 'enviado',
    tech_sheet_name: 'Ficha_Tecnica_Tshirts_Pima.pdf',
    events: [
      {
        id: 'ev-10',
        order_id: 'ped-2026-074',
        to_status: 'concluido',
        note: 'Corte e confecção finalizados, despacho feito via transportadora credenciada.',
        actor_name: 'Rosana Silva',
        actor_role: 'Costureira',
        created_at: '15/10/2026 16:40'
      }
    ]
  },
  {
    id: 'ped-2026-061',
    client_id: 'user-client-1',
    client_name: 'Carlos Drummond',
    client_company: 'Confecções Urbana S/A',
    seamstress_id: 'costureira-3',
    seamstress_name: 'Clara Mendes Alfaiataria',
    title: 'Lote Cápsula: 30 Blazers Estruturados em Linho Puro',
    piece_type: 'Blazer Alfaiataria com vivos acetinados',
    quantity: 30,
    unit_price: 65.00,
    total_price: 1950.00,
    due_date: '2026-10-05',
    created_at: '2026-09-12',
    status: 'concluido',
    events: [
      {
        id: 'ev-20',
        order_id: 'ped-2026-061',
        to_status: 'concluido',
        note: 'Pedido recebido, conferido e aprovado pelo controle de qualidade. Avaliação 5 estrelas concedida.',
        actor_name: 'Carlos Drummond',
        actor_role: 'Contratante',
        created_at: '05/10/2026 11:20'
      }
    ]
  },
  {
    id: 'ped-2026-092',
    client_id: 'user-client-1',
    client_name: 'Carlos Drummond',
    client_company: 'Confecções Urbana S/A',
    seamstress_id: 'costureira-4',
    seamstress_name: 'Facção Vale do Itajaí',
    title: 'Orçamento 2.500 Pijamas Infantis Coleção Inverno',
    piece_type: 'Conjunto Pijama Manga Longa Moletinho',
    quantity: 2500,
    unit_price: 9.80,
    total_price: 24500.00,
    due_date: '2026-12-01',
    created_at: '2026-10-16',
    status: 'orcamento',
    events: [
      {
        id: 'ev-30',
        order_id: 'ped-2026-092',
        to_status: 'orcamento',
        note: 'Solicitação de cotação enviada com prazo para 01 de Dezembro.',
        actor_name: 'Carlos Drummond',
        actor_role: 'Contratante',
        created_at: '16/10/2026 17:05'
      }
    ]
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant_id: 'costureira-1',
    participant_name: 'Dona Maria de Lourdes (Alinhavo & Arte)',
    participant_role: 'Costureira / Oficina',
    participant_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    last_message: 'Bom dia Carlos! Já concluímos a primeira linha de montagem das 400 peças.',
    last_message_at: '10:42',
    unread_count: 1,
    order_id: 'ped-2026-089'
  },
  {
    id: 'conv-2',
    participant_id: 'costureira-2',
    participant_name: 'Rosana Silva (Oficina Moda Sul)',
    participant_role: 'Costureira / Oficina',
    participant_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    last_message: 'O comprovante do frete foi anexado aqui na conversa, confere por favor!',
    last_message_at: 'Ontem',
    unread_count: 0,
    order_id: 'ped-2026-074'
  },
  {
    id: 'conv-3',
    participant_id: 'costureira-3',
    participant_name: 'Clara Mendes Alfaiataria',
    participant_role: 'Costureira Autônoma',
    participant_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    last_message: 'Muito obrigada pela avaliação e pela parceria!',
    last_message_at: '06/10',
    unread_count: 0,
    order_id: 'ped-2026-061'
  }
];

export const mockMessages: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'm1',
      conversation_id: 'conv-1',
      sender_id: 'user-client-1',
      sender_name: 'Carlos Drummond',
      body: 'Olá Dona Maria! Conforme alinhado na ficha técnica, enviamos as 400 unidades já cortadas e etiquetadas.',
      created_at: '14/10 11:00'
    },
    {
      id: 'm2',
      conversation_id: 'conv-1',
      sender_id: 'user-seamstress-1',
      sender_name: 'Dona Maria de Lourdes',
      body: 'Olá Carlos! As caixas chegaram em perfeito estado com todos os cortes e linhas ocre solicitadas.',
      created_at: '14/10 14:15'
    },
    {
      id: 'm3',
      conversation_id: 'conv-1',
      sender_id: 'user-seamstress-1',
      sender_name: 'Dona Maria de Lourdes',
      body: 'Fizemos a primeira peça-piloto para conferência do pesponto duplo e da colocação do bolso relógio.',
      attachment_url: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80',
      attachment_name: 'Peca_Piloto_Jeans_Aprovacao.jpg',
      attachment_type: 'image',
      created_at: '15/10 16:30'
    },
    {
      id: 'm4',
      conversation_id: 'conv-1',
      sender_id: 'user-client-1',
      sender_name: 'Carlos Drummond',
      body: 'Excelente acabamento! Pode rodar toda a produção das 400 peças nesse padrão.',
      created_at: '15/10 17:10'
    },
    {
      id: 'm5',
      conversation_id: 'conv-1',
      sender_id: 'user-seamstress-1',
      sender_name: 'Dona Maria de Lourdes',
      body: 'Bom dia Carlos! Já concluímos a primeira linha de montagem das 400 peças. Tudo dentro do prazo estipulado!',
      created_at: 'Hoje 10:42'
    }
  ]
};

export const mockPlans: Plan[] = [
  {
    id: 'plan-monthly',
    name: 'Plano Mensal',
    period: 'mensal',
    price: 89.00,
    description: 'Ideal para marcas iniciando a terceirização de coleções.',
    features: [
      'Busca ilimitada em todo o banco nacional',
      'Contatos diretos e chat com costureiras',
      'Até 5 pedidos rastreáveis simultâneos',
      'Suporte via chat em horário comercial',
      'Acesso a fornecedores têxteis homologados'
    ]
  },
  {
    id: 'plan-quarterly',
    name: 'Plano Trimestral',
    period: 'trimestral',
    price: 69.00,
    description: 'Mais vantajoso para confecções com demanda contínua.',
    is_popular: true,
    features: [
      'Tudo do plano mensal',
      'Economia de 22% no valor anual',
      'Pedidos rastreáveis ILIMITADOS',
      'Selo de Contratante Ativo no perfil',
      'Atendimento prioritário da plataforma',
      'Acesso à calculadora de custos de costura'
    ]
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise / Indústrias',
    period: 'enterprise',
    price: 249.00,
    description: 'Para grandes magazines e indústrias de alto volume.',
    features: [
      'Gestão multi-usuários para equipe de compras',
      'Gestão avançada de múltiplos ateliês',
      'Integração via API com ERP de produção',
      'Gerente de contas exclusivo e WhatsApp direto',
      'Relatórios analíticos de produtividade de facções'
    ]
  }
];

export const mockSuppliers: SupplierItem[] = [
  {
    id: 'sup-1',
    name: 'Denim & Sarja Premium Brasil',
    category: 'Tecidos',
    company_name: 'Tecelagem Santana do Sul',
    city: 'Americana',
    state: 'SP',
    rating: 4.9,
    description: 'Rolos de índigo 100% algodão, elastano e sarjas coloridas com pronta entrega para confecções.',
    min_order: 'A partir de 1 rolo (50m)',
    delivery_time: '2 a 5 dias úteis',
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'sup-2',
    name: 'Máquinas Industriais Jack & Siruba',
    category: 'Máquinas',
    company_name: 'CosturaMax Equipamentos',
    city: 'São Paulo',
    state: 'SP',
    rating: 5.0,
    description: 'Revenda autorizada de máquinas retas eletrônicas, overloques e galoneiras com parcelamento e garantia de 2 anos.',
    min_order: '1 unidade',
    delivery_time: 'Pronta entrega',
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'sup-3',
    name: 'Zíperes, Linhas e Botões Metálicos',
    category: 'Aviamentos',
    company_name: 'Aviamentos Brás Central',
    city: 'São Paulo',
    state: 'SP',
    rating: 4.7,
    description: 'Catálogo completo de linhas de pesponto, zíperes de metal e nylon, botões de pressão e etiquetas personalizadas.',
    min_order: 'R$ 150,00',
    delivery_time: '1 a 3 dias úteis',
    image_url: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=500&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'sup-4',
    name: 'Modelagem Digital e Graduação Audaces',
    category: 'Serviços',
    company_name: 'Estúdio CAD Têxtil',
    city: 'Goiânia',
    state: 'GO',
    rating: 4.9,
    description: 'Desenvolvimento de moldes computadorizados com encaixe inteligente e economia de até 15% de tecido no corte.',
    min_order: 'Por referência / modelo',
    delivery_time: '48h',
    image_url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=80',
    verified: true
  }
];

export const mockPlatformUsers: PlatformUserItem[] = [
  {
    id: 'usr-1',
    name: 'Dona Maria de Lourdes',
    email: 'maria.costuras@gmail.com',
    phone: '(11) 98765-4321',
    role: 'seamstress',
    company_name: 'Ateliê Alinhavo & Arte',
    city: 'São Paulo',
    state: 'SP',
    registered_at: '14/09/2026',
    status: 'active'
  },
  {
    id: 'usr-2',
    name: 'Carlos Drummond',
    email: 'carlos@modaurbana.com.br',
    phone: '(11) 97123-8899',
    role: 'client',
    company_name: 'Confecções Urbana S/A',
    city: 'São Paulo',
    state: 'SP',
    registered_at: '02/10/2026',
    status: 'active'
  },
  {
    id: 'usr-3',
    name: 'Rosana Silva',
    email: 'rosana@oficinamodasul.com.br',
    phone: '(11) 96541-2233',
    role: 'seamstress',
    company_name: 'Oficina Moda Sul',
    city: 'São Paulo',
    state: 'SP',
    registered_at: '20/09/2026',
    status: 'active'
  },
  {
    id: 'usr-4',
    name: 'Roberto Valente',
    email: 'comercial@texbras.com.br',
    phone: '(11) 91234-5678',
    role: 'supplier',
    company_name: 'TexBrás Tecidos & Aviamentos',
    city: 'Americana',
    state: 'SP',
    registered_at: '05/10/2026',
    status: 'active'
  }
];
