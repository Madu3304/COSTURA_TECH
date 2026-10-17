export type UserRole = 'seamstress' | 'client' | 'supplier' | 'admin';

export type OrderStatus = 
  | 'orcamento' 
  | 'aceito' 
  | 'em_producao' 
  | 'enviado' 
  | 'entregue' 
  | 'pago' 
  | 'concluido';

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  is_verified: boolean;
  avatar_url?: string;
  company_name?: string;
  cnpj?: string;
  plan_id?: string;
}

export interface SeamstressProfile {
  id: string;
  user_id: string;
  display_name: string;
  tagline: string;
  bio: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  rating: number;
  reviews_count: number;
  capacity_month: number;
  is_workshop: boolean;
  workers_count: number;
  experience_years: number;
  min_pieces: number;
  verified: boolean;
  specialties: string[];
  machines: string[];
  portfolio_photos: {
    id: string;
    url: string;
    caption: string;
  }[];
  price_range: string;
}

export interface OrderEvent {
  id: string;
  order_id: string;
  from_status?: OrderStatus;
  to_status: OrderStatus;
  note: string;
  actor_name: string;
  actor_role: string;
  created_at: string;
}

export interface Order {
  id: string;
  client_id: string;
  client_name: string;
  client_company: string;
  seamstress_id: string;
  seamstress_name: string;
  title: string;
  piece_type: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  due_date: string;
  created_at: string;
  status: OrderStatus;
  tech_sheet_name?: string;
  tech_sheet_url?: string;
  events: OrderEvent[];
  notes?: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  body: string;
  attachment_url?: string;
  attachment_name?: string;
  attachment_type?: 'image' | 'pdf' | 'doc';
  created_at: string;
  read_at?: string;
  flagged?: boolean;
}

export interface Conversation {
  id: string;
  participant_id: string;
  participant_name: string;
  participant_role: string;
  participant_avatar?: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
  order_id?: string;
}

export interface Plan {
  id: string;
  name: string;
  period: 'mensal' | 'trimestral' | 'enterprise';
  price: number;
  description: string;
  is_popular?: boolean;
  features: string[];
}

export interface SupplierItem {
  id: string;
  name: string;
  category: 'Tecidos' | 'Máquinas' | 'Aviamentos' | 'Serviços';
  company_name: string;
  city: string;
  state: string;
  rating: number;
  description: string;
  min_order?: string;
  delivery_time?: string;
  image_url: string;
  verified: boolean;
}

export interface PlatformUserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  company_name?: string;
  city: string;
  state: string;
  registered_at: string;
  status: 'active' | 'suspended';
}
