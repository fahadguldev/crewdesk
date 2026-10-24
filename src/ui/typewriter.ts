/**
 * Typewriter Hero Headline Animation
 * Runs immediately after the loading screen finishes.
 * Types the requested copy line-by-line in under 3 seconds.
 * Supports styled tokens (e.g. Urdu Nastaleeq green daftar, green hub).
 */

export interface TextToken {
  text: string;
  className?: string;
  isUrdu?: boolean;
}

export interface TypewriterLine {
  tokens: TextToken[];
  className?: string;
}

export interface TypewriterConfig {
  structure: TypewriterLine[];
  totalDurationMs?: number;
}

const DEFAULT_STRUCTURE: TypewriterLine[] = [
  {
    tokens: [
      { text: 'Manage your whole ' },
      { text: 'دفتر', className: 'type-urdu-green urdu', isUrdu: true }
    ]
  },
  {
    tokens: [
      { text: 'from one ' },
      { text: 'Hub', className: 'type-green-hub' }
    ]
  },
  {
    className: 'hero-muted',
    tokens: [{ text: 'not disconnected tools and sheets' }]
  }
];

let hasStarted = false;

export function initTypewriter(config?: Partial<TypewriterConfig>): void {
  if (hasStarted) return;

  const container = document.getElementById('typewriter-text');
  const cursor = document.getElementById('typing-cursor');
  if (!container) return;

  hasStarted = true;

  const structure = config?.structure ?? DEFAULT_STRUCTURE;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduced motion: show full styled text immediately
  if (isReduced) {
    container.innerHTML = formatCompleteStructure(structure);
    if (cursor) cursor.style.display = 'none';
    return;
  }

  // Count total characters to pace under 3 seconds (target: ~2.3 seconds)
  let totalChars = 0;
  structure.forEach((l) => l.tokens.forEach((t) => (totalChars += t.text.length)));
  const targetDurationMs = config?.totalDurationMs ?? 2300;
  const charDelay = Math.max(18, Math.floor(targetDurationMs / totalChars));

  // Build DOM layout with empty token spans ready to receive characters
  container.innerHTML = '';
  const tokenSpans: HTMLElement[][] = [];

  structure.forEach((line, lineIdx) => {
    const lineWrapper = document.createElement('span');
    lineWrapper.className = `typing-line ${line.className || ''}`;

    const spansForLine: HTMLElement[] = [];
    line.tokens.forEach((token) => {
      const span = document.createElement('span');
      if (token.className) span.className = token.className;
      if (token.isUrdu) {
        span.setAttribute('dir', 'rtl');
        span.setAttribute('lang', 'ur');
      }
      lineWrapper.appendChild(span);
      spansForLine.push(span);
    });

    container.appendChild(lineWrapper);
    tokenSpans.push(spansForLine);

    if (lineIdx < structure.length - 1) {
      container.appendChild(document.createElement('br'));
    }
  });

  let lineIdx = 0;
  let tokenIdx = 0;
  let charIdx = 0;

  function typeNextChar(): void {
    if (lineIdx >= structure.length) {
      if (cursor) cursor.classList.add('is-done');
      return;
    }

    const currentLine = structure[lineIdx];
    if (tokenIdx >= currentLine.tokens.length) {
      lineIdx++;
      tokenIdx = 0;
      charIdx = 0;
      setTimeout(typeNextChar, charDelay * 1.5);
      return;
    }

    const currentToken = currentLine.tokens[tokenIdx];
    const targetSpan = tokenSpans[lineIdx][tokenIdx];

    if (cursor && targetSpan.parentElement && cursor.parentElement !== targetSpan.parentElement) {
      targetSpan.parentElement.appendChild(cursor);
    }

    if (charIdx < currentToken.text.length) {
      targetSpan.textContent += currentToken.text[charIdx];
      charIdx++;
      setTimeout(typeNextChar, charDelay);
    } else {
      tokenIdx++;
      charIdx = 0;
      setTimeout(typeNextChar, charDelay * 1.2);
    }
  }

  // Small delay after preloader hides
  setTimeout(typeNextChar, 120);
}

function formatCompleteStructure(structure: TypewriterLine[]): string {
  return structure
    .map((line) => {
      const inner = line.tokens
        .map(
          (t) =>
            `<span class="${t.className || ''}" ${t.isUrdu ? 'dir="rtl" lang="ur"' : ''}>${escapeHtml(t.text)}</span>`
        )
        .join('');
      return `<span class="typing-line ${line.className || ''}">${inner}</span>`;
    })
    .join('<br />');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
