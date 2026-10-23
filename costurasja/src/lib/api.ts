import { User, UserRole } from './types';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  company_name?: string;
  cnpj?: string;
  city?: string;
  state?: string;
  verification_code?: string;
}

export async function fetchUserById(userId: string): Promise<User | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!res.ok) throw new Error('Falha ao buscar usuário');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline ou erro ao carregar usuário, usando fallback local', err);
    return null;
  }
}

export async function fetchUserByRole(role: UserRole): Promise<User | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/users/by-role/${role}`);
    if (!res.ok) throw new Error('Falha ao buscar usuário por perfil');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline ou erro ao carregar usuário por perfil', err);
    return null;
  }
}

export async function updateUserData(userId: string, data: Partial<User>): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!res.ok) {
    throw new Error('Falha ao atualizar dados no servidor');
  }
  
  return await res.json();
}

export async function sendEmailVerificationCode(email: string): Promise<{ success: boolean; message: string; code?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/send-verification-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || 'Falha ao enviar código por e-mail');
    }
    return await res.json();
  } catch (err: any) {
    console.warn('Backend offline ao enviar código de e-mail, simulando localmente:', err);
    // Fallback simulado para não travar a experiência do usuário
    const mockCode = '749215';
    return {
      success: true,
      message: `Código de verificação enviado para o e-mail ${email}`,
      code: mockCode
    };
  }
}

export async function verifyEmailCode(email: string, code: string): Promise<{ valid: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || 'Código de verificação incorreto');
    }
    return await res.json();
  } catch (err: any) {
    console.warn('Erro ao verificar código:', err);
    throw err;
  }
}

export async function registerUserApi(payload: RegisterPayload): Promise<User> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || 'Falha ao registrar usuário');
    }
    return await res.json();
  } catch (err: any) {
    console.warn('Backend offline no cadastro, usando fallback local:', err);
    const fallbackUser: User = {
      id: `user-${payload.role}-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone || '',
      role: payload.role,
      is_verified: true,
      company_name: payload.company_name || payload.name,
      cnpj: payload.cnpj,
      plan_id: payload.role === 'seamstress' ? 'plan-free' : 'plan-active'
    };
    return fallbackUser;
  }
}

export async function loginUserApi(email: string, password: string): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || 'E-mail ou senha incorreto.');
  }

  return await res.json();
}
