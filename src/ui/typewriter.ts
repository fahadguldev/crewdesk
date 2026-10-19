/**
 * Typewriter Hero Headline Animation
 * Runs immediately after the loading screen finishes.
 * Types the requested copy line-by-line in under 3 seconds.
 */

interface TypewriterConfig {
  lines: string[];
  totalDurationMs?: number;
}

const DEFAULT_LINES = [
  'manage your whole dafter',
  'from one single hub',
  'not 5 tools and a',
  'spread sheet.'
];

let hasStarted = false;

export function initTypewriter(config?: Partial<TypewriterConfig>): void {
  if (hasStarted) return;

  const container = document.getElementById('typewriter-text');
  const cursor = document.getElementById('typing-cursor');
  if (!container) return;

  hasStarted = true;

  const lines = config?.lines ?? DEFAULT_LINES;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduced motion: show full text immediately
  if (isReduced) {
    container.innerHTML = formatCompleteLines(lines);
    if (cursor) cursor.style.display = 'none';
    return;
  }

  // Calculate speed to ensure it completes in under 3 seconds (target: ~2.3 seconds)
  const totalChars = lines.reduce((acc, l) => acc + l.length, 0);
  const targetDurationMs = config?.totalDurationMs ?? 2300;
  const charDelay = Math.max(18, Math.floor(targetDurationMs / totalChars));

  let currentLineIdx = 0;
  let currentCharIdx = 0;

  // Setup initial DOM lines
  container.innerHTML = '';
  const lineSpans: HTMLElement[] = lines.map((_, i) => {
    const span = document.createElement('span');
    span.className = `typing-line ${i >= 2 ? 'hero-muted' : ''}`;
    container.appendChild(span);
    if (i < lines.length - 1) {
      container.appendChild(document.createElement('br'));
    }
    return span;
  });

  function typeNextChar(): void {
    if (currentLineIdx >= lines.length) {
      // Completed typing!
      if (cursor) {
        cursor.classList.add('is-done');
      }
      return;
    }

    const currentLineText = lines[currentLineIdx];
    if (currentCharIdx < currentLineText.length) {
      const char = currentLineText[currentCharIdx];
      lineSpans[currentLineIdx].textContent += char;
      currentCharIdx++;
      setTimeout(typeNextChar, charDelay);
    } else {
      // Move to next line
      currentLineIdx++;
      currentCharIdx = 0;
      setTimeout(typeNextChar, charDelay * 1.5);
    }
  }

  // Small breath after preloader fade before typing starts
  setTimeout(typeNextChar, 120);
}

function formatCompleteLines(lines: string[]): string {
  return lines
    .map((line, i) => `<span class="typing-line ${i >= 2 ? 'hero-muted' : ''}">${escapeHtml(line)}</span>`)
    .join('<br />');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
