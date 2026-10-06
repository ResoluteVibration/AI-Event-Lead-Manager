from google import genai

from app.core.config import settings


client = genai.Client(
    api_key=settings.gemini_api_key
)


MODEL_NAME = "gemini-3.8-flash"


def generate_text(prompt: str) -> str:
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
    )

    if not response.text:
        raise RuntimeError(
            "Gemini returned an empty response."
        )

    return response.text