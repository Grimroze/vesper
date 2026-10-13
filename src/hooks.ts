import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('dsa_bookmarks');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('dsa_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  };

  return { bookmarks, toggleBookmark };
}

export function useCompleted() {
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('dsa_completed');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('dsa_completed', JSON.stringify(completed));
  }, [completed]);

  const toggleCompleted = (id: string) => {
    setCompleted(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  };

  return { completed, toggleCompleted };
}
