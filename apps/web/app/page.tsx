'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import type { List } from '../types/lists';
import type { Card } from '../types/cards';

interface Board {
  id: number;
  title: string;
  lists?: ListWithCards[];
}

interface ListWithCards extends List {
  cards?: Card[];
}

export default function HomePage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardsWithListsAndCards = async () => {
      try {
        const boardsRes = await api.get<Board[]>('/boards');
        const boardsData = boardsRes.data;

        const boardsWithLists = await Promise.all(
          boardsData.map(async (board) => {
            // Traer listas de cada board
            const listsRes = await api.get<List[]>(`/lists/board/${board.id}`);
            const listsData = listsRes.data;

            // Traer tarjetas de cada lista
            const listsWithCards = await Promise.all(
              listsData.map(async (list) => {
                const cardsRes = await api.get<Card[]>(`/cards/list/${list.id}`);
                return {
                  ...list,
                  cards: cardsRes.data,
                };
              })
            );

            return {
              ...board,
              lists: listsWithCards,
            };
          })
        );

        setBoards(boardsWithLists);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardsWithListsAndCards();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Tableros</h1>
      {boards.length === 0 ? (
        <p>No hay tableros aún</p>
      ) : (
        <ul className="space-y-4">
          {boards.map((board) => (
            <li key={board.id} className="p-4 bg-gray-100 rounded-lg shadow">
              <h2 className="font-semibold mb-2">{board.title}</h2>
              {board.lists?.length ? (
                <div className="flex space-x-4 overflow-x-auto">
                  {board.lists.map((list) => (
                    <div key={list.id} className="min-w-[200px] p-2 bg-gray-200 rounded">
                      <h3 className="font-medium mb-2">{list.title}</h3>
                      {list.cards?.length ? (
                        <ul className="space-y-1">
                          {list.cards.map((card) => (
                            <li key={card.id} className="p-2 bg-white rounded shadow">
                              <h3 className='font-bold'>{card.title}</h3>
                                  <p>{card.description}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No hay tarjetas</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No hay listas</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
