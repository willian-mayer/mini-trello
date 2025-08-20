// apps/web/types/cards.ts
export interface Card {
  id: number;
  title: string;
  description?: string; // opcional, si quieres agregar descripción
  listId: number;        // referencia a la lista a la que pertenece
  createdAt?: string;    // opcional, fecha de creación
}
