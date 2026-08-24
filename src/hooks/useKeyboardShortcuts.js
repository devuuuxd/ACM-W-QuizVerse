import { useEffect } from 'react';


export default function useKeyboardShortcuts({
  onSelectOption,
  onNext,
  onPrev,
  onToggleFlag,
  onSubmit,
  onToggleShortcuts,
  enabled = true,
}) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e) {
      
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      
      if (e.key === '?' || (e.key === '/' && !e.ctrlKey && !e.metaKey)) {
        e.preventDefault();
        onToggleShortcuts?.();
        return;
      }

      
      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        const index = parseInt(e.key, 10) - 1;
        onSelectOption?.(index);
        return;
      }

      const keyLower = e.key.toLowerCase();
      if (['a', 'b', 'c', 'd'].includes(keyLower)) {
        e.preventDefault();
        const map = { a: 0, b: 1, c: 2, d: 3 };
        onSelectOption?.(map[keyLower]);
        return;
      }

      
      if (e.key === 'ArrowLeft' || keyLower === 'p') {
        e.preventDefault();
        onPrev?.();
        return;
      }

      
      if (e.key === 'ArrowRight' || keyLower === 'n') {
        e.preventDefault();
        onNext?.();
        return;
      }

      
      if (keyLower === 'f') {
        e.preventDefault();
        onToggleFlag?.();
        return;
      }

      
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onSubmit?.();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onSelectOption, onNext, onPrev, onToggleFlag, onSubmit, onToggleShortcuts]);
}
