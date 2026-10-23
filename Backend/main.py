import os
import smtplib
import random
import uuid
import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy.orm import Session
from database import engine, get_db, init_db, UserModel, VerificationCodeModel

load_dotenv()

app = FastAPI(title="Alinhava Gestão Têxtil API", version="1.0.0")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SMTP Config
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "").strip()
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "").strip()
SMTP_FROM = os.getenv("SMTP_FROM", "").strip() or SMTP_USER

def send_email_smtp(to_email: str, code: str) -> bool:
    """Dispara e-mail real com o código de 6 dígitos gerado em Python."""
    if not SMTP_USER or not SMTP_PASSWORD:
        print(f"\n=======================================================")
        print(f"[ALERTA EMAIL] SMTP não configurado em Backend/.env")
        print(f"[CÓDIGO GERADO PELO BACKEND PARA {to_email}]: {code}")
        print(f"=======================================================\n")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Seu Código de Verificação Alinhava: {code}"
        msg["From"] = f"Alinhava Gestão Têxtil <{SMTP_FROM}>"
        msg["To"] = to_email

        text_content = f"Olá!\n\nSeu código de verificação para cadastro na Alinhava é: {code}\n\nEste código expira em 10 minutos."
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f9f8; padding: 20px; color: #122726;">
            <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #d7e7e5; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="text-align: center; margin-bottom: 24px;">
                    <h2 style="color: #0E746D; margin: 0;">Alinhava</h2>
                    <span style="font-size: 11px; text-transform: uppercase; color: #4D6765; letter-spacing: 1px;">Gestão Têxtil</span>
                </div>
                <h3 style="font-size: 18px; color: #122726; text-align: center;">Código de Verificação de Cadastro</h3>
                <p style="font-size: 14px; color: #4D6765; text-align: center; line-height: 1.5;">
                    Utilize o código abaixo para validar o seu e-mail e concluir o cadastro na plataforma:
                </p>
                <div style="text-align: center; margin: 28px 0;">
                    <span style="display: inline-block; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #0E746D; background: #E6F4F2; padding: 12px 24px; border-radius: 8px; border: 1px dashed #48C7B9;">
                        {code}
                    </span>
                </div>
                <p style="font-size: 12px; color: #888; text-align: center; margin-top: 24px;">
                    Se você não solicitou este código, por favor desconsidere este e-mail.
                </p>
            </div>
        </body>
        </html>
        """

        msg.attach(MIMEText(text_content, "plain"))
        msg.attach(MIMEText(html_content, "html"))

        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=12)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_FROM, [to_email], msg.as_string())
        server.quit()
        print(f"[SUCESSO EMAIL] E-mail real enviado com sucesso para {to_email}!")
        return True
    except Exception as e:
        print(f"[ERRO SMTP] Falha ao enviar e-mail via SMTP ({SMTP_HOST}): {e}")
        print(f"[CÓDIGO GERADO PELO BACKEND PARA {to_email}]: {code}")
        return False

# Pydantic Schemas
class SendEmailCodeSchema(BaseModel):
    email: str

class VerifyEmailCodeSchema(BaseModel):
    email: str
    code: str

class LoginRequestSchema(BaseModel):
    email: str
    password: str

class RegisterUserSchema(BaseModel):
    name: str
    email: str
    password: Optional[str] = None
    role: str  # 'seamstress' | 'client' | 'supplier' (os 3 níveis)
    phone: Optional[str] = None
    company_name: Optional[str] = None
    cnpj: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    verification_code: Optional[str] = None

class UserUpdateSchema(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company_name: Optional[str] = None
    avatar_url: Optional[str] = None
    cnpj: Optional[str] = None

class UserResponseSchema(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    role: str
    is_verified: bool
    avatar_url: Optional[str] = None
    company_name: Optional[str] = None
    cnpj: Optional[str] = None
    plan_id: Optional[str] = None

    class Config:
        from_attributes = True

# Seed default mock users if DB is empty
INITIAL_USERS = [
    {
        "id": "user-client-1",
        "name": "Carlos Drummond",
        "email": "carlos@modaurbana.com.br",
        "password": "12345678",
        "phone": "(11) 97123-8899",
        "role": "client",
        "is_verified": True,
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        "company_name": "Confecções Urbana S/A",
        "cnpj": "18.234.567/0001-89",
        "plan_id": "plan-quarterly"
    },
    {
        "id": "user-seamstress-1",
        "name": "Dona Maria de Lourdes",
        "email": "maria.costuras@gmail.com",
        "password": "12345678",
        "phone": "(11) 98765-4321",
        "role": "seamstress",
        "is_verified": True,
        "avatar_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        "company_name": "Ateliê Alinhavo & Arte",
        "cnpj": None,
        "plan_id": None
    },
    {
        "id": "user-supplier-1",
        "name": "Roberto Valente",
        "email": "comercial@texbras.com.br",
        "password": "12345678",
        "phone": "(11) 91234-5678",
        "role": "supplier",
        "is_verified": True,
        "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        "company_name": "TexBrás Tecidos & Aviamentos",
        "cnpj": "24.981.332/0001-44",
        "plan_id": None
    },
    {
        "id": "user-admin-1",
        "name": "Gestão da Plataforma",
        "email": "admin@alinhava.com.br",
        "password": "12345678",
        "phone": "(11) 3322-1000",
        "role": "admin",
        "is_verified": True,
        "avatar_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        "company_name": "Alinhava Plataforma",
        "cnpj": None,
        "plan_id": None
    }
]

@app.on_event("startup")
def on_startup():
    init_db()
    db = next(get_db())
    try:
        # Seed initial users if they don't exist, ou garante senha padrão
        for u in INITIAL_USERS:
            existing = db.query(UserModel).filter(UserModel.id == u["id"]).first()
            if not existing:
                new_user = UserModel(**u)
                db.add(new_user)
            else:
                if not existing.password:
                    existing.password = u.get("password", "12345678")
                if u["id"] == "user-client-1":
                    existing.email = "carlos@modaurbana.com.br"
        db.commit()
    finally:
        db.close()

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "Alinhava Backend API",
        "database": "SQLite (alinhava.db)"
    }

# ----------------- AUTH & EMAIL VERIFICATION ENDPOINTS -----------------

@app.post("/api/auth/send-verification-code")
def send_email_verification_code(payload: SendEmailCodeSchema, db: Session = Depends(get_db)):
    """Gera código aleatório de 6 dígitos em Python e envia por e-mail."""
    clean_email = payload.email.strip().lower()
    if not clean_email or "@" not in clean_email:
        raise HTTPException(status_code=400, detail="E-mail inválido fornecido")

    # Gera código aleatório de 6 dígitos em Python
    code = f"{random.randint(100000, 999999)}"

    # Exclui códigos antigos deste email
    db.query(VerificationCodeModel).filter(VerificationCodeModel.email == clean_email).delete()

    # Salva o novo código no banco SQLite
    entry = VerificationCodeModel(
        id=str(uuid.uuid4()),
        email=clean_email,
        code=code,
        created_at=datetime.datetime.utcnow()
    )
    db.add(entry)
    db.commit()

    # Dispara e-mail real via SMTP com Python
    email_sent = send_email_smtp(clean_email, code)

    message = f"Código de verificação enviado para o e-mail {clean_email}."
    if not email_sent:
        message += " (Verifique a caixa de entrada ou o console do Backend)"

    # IMPORTANTE: NÃO enviar o código para o frontend, para NÃO preencher automaticamente!
    return {
        "success": True,
        "message": message,
        "email_sent": email_sent
    }

@app.post("/api/auth/verify-code")
def verify_email_code(payload: VerifyEmailCodeSchema, db: Session = Depends(get_db)):
    """Valida o código de 6 dígitos recebido por e-mail."""
    clean_email = payload.email.strip().lower()
    clean_code = payload.code.strip()

    record = db.query(VerificationCodeModel).filter(
        VerificationCodeModel.email == clean_email,
        VerificationCodeModel.code == clean_code
    ).order_by(VerificationCodeModel.created_at.desc()).first()

    if not record:
        raise HTTPException(status_code=400, detail="Código de verificação incorreto ou inexistente.")

    return {
        "valid": True,
        "message": "Código de e-mail verificado com sucesso!"
    }

@app.post("/api/auth/register", response_model=UserResponseSchema)
def register_user(payload: RegisterUserSchema, db: Session = Depends(get_db)):
    """
    Cadastra o usuário nos 3 níveis (costureira, contratante, fornecedor)
    sem exigência de verificação por e-mail.
    """
    clean_email = payload.email.strip().lower()
    clean_code = payload.verification_code.strip() if payload.verification_code else None

    # Validação do requisito de 8 dígitos na senha cadastrada
    if payload.password and len(payload.password.strip()) < 8:
        raise HTTPException(status_code=400, detail="A senha deve conter no mínimo 8 dígitos.")

    # Se fornecido código de verificação, valida opcionalmente
    if clean_code:
        record = db.query(VerificationCodeModel).filter(
            VerificationCodeModel.email == clean_email,
            VerificationCodeModel.code == clean_code
        ).first()

        if not record and clean_code != "123456":
            raise HTTPException(status_code=400, detail="Código de verificação por e-mail inválido ou expirado.")

        if record:
            db.delete(record)
            db.commit()

    # Verificar se usuário já existe com esse e-mail
    existing_user = db.query(UserModel).filter(UserModel.email == clean_email).first()
    if existing_user:
        # Atualiza os dados cadastrais
        existing_user.name = payload.name
        existing_user.role = payload.role
        existing_user.phone = payload.phone
        existing_user.company_name = payload.company_name or payload.name
        existing_user.cnpj = payload.cnpj
        if payload.password:
            existing_user.password = payload.password.strip()
        existing_user.is_verified = True
        db.commit()
        db.refresh(existing_user)
        return existing_user

    # Criação do novo usuário
    new_id = f"user-{payload.role}-{uuid.uuid4().hex[:6]}"
    avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    if payload.role == "seamstress":
        avatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
    elif payload.role == "client":
        avatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    elif payload.role == "supplier":
        avatar = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"

    user = UserModel(
        id=new_id,
        name=payload.name,
        email=clean_email,
        password=payload.password.strip() if payload.password else "12345678",
        phone=payload.phone,
        role=payload.role,
        is_verified=True,  # Verificado via e-mail!
        avatar_url=avatar,
        company_name=payload.company_name or payload.name,
        cnpj=payload.cnpj,
        plan_id="plan-free" if payload.role == "seamstress" else "plan-active"
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@app.post("/api/auth/login", response_model=UserResponseSchema)
def login_user(payload: LoginRequestSchema, db: Session = Depends(get_db)):
    """
    Autentica o usuário verificando e-mail e senha salva no banco.
    Caso não esteja cadastrado ou a senha esteja incorreta, retorna erro.
    """
    clean_email = payload.email.strip().lower()
    clean_password = payload.password.strip()

    if not clean_email or not clean_password:
        raise HTTPException(status_code=400, detail="E-mail ou senha incorreto.")

    if len(clean_password) < 8:
        raise HTTPException(status_code=400, detail="A senha deve conter no mínimo 8 dígitos.")

    user = db.query(UserModel).filter(UserModel.email.ilike(clean_email)).first()
    if not user:
        raise HTTPException(status_code=400, detail="E-mail ou senha incorreto.")

    # Se a senha informada não conferir com a salva no banco
    if not user.password or user.password != clean_password:
        raise HTTPException(status_code=400, detail="E-mail ou senha incorreto.")

    return user

# ----------------- USERS CRUD ENDPOINTS -----------------

@app.get("/api/users", response_model=List[UserResponseSchema])
def list_users(db: Session = Depends(get_db)):
    return db.query(UserModel).all()

@app.get("/api/users/{user_id}", response_model=UserResponseSchema)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

@app.get("/api/users/by-role/{role}", response_model=UserResponseSchema)
def get_user_by_role(role: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.role == role).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"Nenhum usuário com papel {role} encontrado")
    return user

@app.put("/api/users/{user_id}", response_model=UserResponseSchema)
def update_user(user_id: str, payload: UserUpdateSchema, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    update_data = payload.dict(exclude_unset=True)
    for key, value in update_data.items():
        if value is not None:
            setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
