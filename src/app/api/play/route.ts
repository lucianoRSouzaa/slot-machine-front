import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiUrl = `${process.env.API_URL}/play`;

  try {
    const body = await request.json();
    const response = await axios.post(apiUrl, body, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA0MGUwZTQtZTYxZS00NjI5LWI4YWItZTVkNzc2NWIzMGZjIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImV4cCI6MTczOTkyNTIzOSwiaWF0IjoxNzM5OTI0MzM5fQ.WxXinMltjha2s2_rh8Wy84-pPh1k1rhhavLTY-wIOMc`,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Erro na API interna:", error);
    return NextResponse.json(
      { error: "Erro ao processar a solicitação" },
      { status: 500 }
    );
  }
}
