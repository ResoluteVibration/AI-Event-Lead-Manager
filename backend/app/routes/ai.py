from fastapi import APIRouter, HTTPException

from pydantic import BaseModel, EmailStr

from app.services.ai_service import generate_text


router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
)


class LeadAIRequest(BaseModel):
    name: str
    company: str
    email: EmailStr
    event: str
    notes: str
    follow_up_status: str


class AIResponse(BaseModel):
    result: str


@router.post(
    "/summarize",
    response_model=AIResponse,
)
def summarize_lead(
    lead: LeadAIRequest,
):
    prompt = f"""
You are an assistant for an event lead management application.

Summarize the following business lead interaction.

Lead:
Name: {lead.name}
Company: {lead.company}
Email: {lead.email}
Event: {lead.event}
Follow-up Status: {lead.follow_up_status}

Interaction Notes:
{lead.notes}

Create a concise professional summary.

Include:
- Who the person is
- Their company
- What was discussed
- Their apparent interest
- Any relevant follow-up information

Do not invent information that is not present in the notes.
"""

    try:
        result = generate_text(prompt)

        return {
            "result": result
        }

    except Exception as exc:
            print("GEMINI ERROR:", repr(exc))
            raise HTTPException(
                status_code=500,
                detail=str(exc)
        ) from exc


@router.post(
    "/follow-up",
    response_model=AIResponse,
)
def draft_follow_up(
    lead: LeadAIRequest,
):
    prompt = f"""
You are a professional business communication assistant.

Draft a concise follow-up email for the following event lead.

Lead:
Name: {lead.name}
Company: {lead.company}
Email: {lead.email}
Event: {lead.event}

Interaction Notes:
{lead.notes}

Follow-up Status:
{lead.follow_up_status}

Requirements:
- Professional but natural tone
- Mention the event naturally
- Refer only to information contained in the notes
- Do not invent promises, products, prices, meetings, or facts
- Keep the email concise
- Include a useful subject line
- Do not use excessive marketing language
"""

    try:
        result = generate_text(prompt)

        return {
            "result": result
        }

    except Exception as exc:
        print("GEMINI ERROR:", repr(exc))
        raise HTTPException(
            status_code=500,
            detail=str(exc)
    ) from exc