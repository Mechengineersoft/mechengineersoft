import { useEffect, useState } from 'react';
import { PortfolioRecord, projectFromPortfolioRecord, projects } from './projects';

export function usePortfolioProjects() {
  const [items, setItems] = useState(projects);

  useEffect(() => {
    fetch('/api/site/content/portfolio', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) return;
        const result = await response.json();
        if (Array.isArray(result.items) && result.items.length > 0) {
          setItems(result.items.map((item: PortfolioRecord) => projectFromPortfolioRecord(item)));
        }
      })
      .catch(() => undefined);
  }, []);

  return items;
}