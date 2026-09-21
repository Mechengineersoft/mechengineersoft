import { useEffect, useState } from 'react';

export function usePublicContent<T>(collection: string, fallback: T[]): T[] {
  const [items, setItems] = useState<T[]>(fallback);

  useEffect(() => {
    let active = true;
    fetch(`/api/site/content/${collection}`, { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) return;
        const result = await response.json();
        if (active && Array.isArray(result.items) && result.items.length > 0) setItems(result.items);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, [collection]);

  return items;
}