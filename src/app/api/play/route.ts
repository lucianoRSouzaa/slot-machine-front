import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiUrl = `${process.env.API_URL}/play`;

  try {
    const response = await axios.post(apiUrl, request.body);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.log(error);

    console.error("Erro na API interna:", error);
    return NextResponse.json(
      { error: "Erro ao processar a solicitação" },
      { status: 500 }
    );
  }
}
