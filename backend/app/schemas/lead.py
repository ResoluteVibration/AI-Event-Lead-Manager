from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr

from app.db.models import FollowUpStatus


class LeadBase(BaseModel):
    name: str
    company: str
    email: EmailStr
    event: str
    notes: str
    follow_up_status: FollowUpStatus = FollowUpStatus.PENDING


class LeadCreate(LeadBase):
    pass


class LeadUpdate(BaseModel):
    name: str | None = None
    company: str | None = None
    email: EmailStr | None = None
    event: str | None = None
    notes: str | None = None
    follow_up_status: FollowUpStatus | None = None


class LeadResponse(LeadBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )