import os
import datetime
from sqlalchemy import create_engine, Column, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'alinhava.db')}"

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=True, default="12345678")
    phone = Column(String, nullable=True)
    role = Column(String, nullable=False, default="client")
    is_verified = Column(Boolean, default=True)
    avatar_url = Column(String, nullable=True)
    company_name = Column(String, nullable=True)
    cnpj = Column(String, nullable=True)
    plan_id = Column(String, nullable=True)

class VerificationCodeModel(Base):
    __tablename__ = "verification_codes"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, index=True, nullable=False)
    code = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
