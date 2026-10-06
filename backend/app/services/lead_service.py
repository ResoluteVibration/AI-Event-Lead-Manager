from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.db.models import FollowUpStatus, Lead
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
    search: str | None = None,
    status: FollowUpStatus | None = None,
    event: str | None = None,
    page: int = 1,
    page_size: int = 10,
) -> tuple[list[Lead], int]:

    statement = select(Lead)

    # Search
    if search:
        search_term = f"%{search}%"

        statement = statement.where(
            or_(
                Lead.name.ilike(search_term),
                Lead.company.ilike(search_term),
                Lead.email.ilike(search_term),
                Lead.event.ilike(search_term),
                Lead.notes.ilike(search_term),
            )
        )

    # Status filter
    if status:
        statement = statement.where(
            Lead.follow_up_status == status
        )

    # Event filter
    if event:
        statement = statement.where(
            Lead.event.ilike(f"%{event}%")
        )

    # Total matching records
    count_statement = select(Lead.id)

    if search:
        search_term = f"%{search}%"

        count_statement = count_statement.where(
            or_(
                Lead.name.ilike(search_term),
                Lead.company.ilike(search_term),
                Lead.email.ilike(search_term),
                Lead.event.ilike(search_term),
                Lead.notes.ilike(search_term),
            )
        )

    if status:
        count_statement = count_statement.where(
            Lead.follow_up_status == status
        )

    if event:
        count_statement = count_statement.where(
            Lead.event.ilike(f"%{event}%")
        )

    total = len(
        db.execute(count_statement).all()
    )

    # Pagination
    offset = (page - 1) * page_size

    statement = statement.order_by(
        Lead.created_at.desc()
    ).offset(offset).limit(page_size)

    result = db.execute(statement)

    leads = list(result.scalars().all())

    return leads, total


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