import { createSession } from '@/app/lib/sessions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    console.log('Token:', token);

    if (!token) {
      return NextResponse.json({ error: 'Token é necessário' }, { status: 400 });
    }

    const session = await createSession(token);

    return NextResponse.json({ message: 'Cookie salvo com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({ error: 'Erro ao processar a requisição' }, { status: 500 }); // Retorna erro genérico
  }
}
