'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';

interface Board {
  id: number;
  title: string;
}

export default function HomePage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/boards')
      .then(res => setBoards(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Tableros</h1>
      {boards.length === 0 ? (
        <p>No hay tableros aún</p>
      ) : (
        <ul className="space-y-2">
          {boards.map(board => (
            <li key={board.id} className="p-4 bg-gray-100 rounded-lg shadow">
              {board.title}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
