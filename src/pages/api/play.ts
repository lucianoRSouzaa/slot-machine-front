import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   const apiUrl = `${process.env.API_URL}/play`;

  try {
    const response = await axios.post(apiUrl, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro na API interna:', error);
    res.status(500).json({ error: 'Erro ao processar a solicitação' });
  }
}
