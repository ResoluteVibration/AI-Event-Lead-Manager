from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.models import Lead
from app.schemas.lead import LeadCreate, LeadUpdate


def create_lead(
    db: Session,
    lead_data: LeadCreate,
) -> Lead:

    lead = Lead(
        **lead_data.model_dump()
    )

    db.add(lead)
    db.commit()
    db.refresh(lead)

    return lead


def get_leads(
    db: Session,
) -> list[Lead]:

    statement = select(Lead).order_by(
        Lead.created_at.desc()
    )

    result = db.execute(statement)

    return list(result.scalars().all())


def get_lead(
    db: Session,
    lead_id: int,
) -> Lead | None:

    return db.get(Lead, lead_id)


def update_lead(
    db: Session,
    lead: Lead,
    lead_data: LeadUpdate,
) -> Lead:

    update_data = lead_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(lead, field, value)

    db.commit()
    db.refresh(lead)

    return lead


def delete_lead(
    db: Session,
    lead: Lead,
) -> None:

    db.delete(lead)
    db.commit()