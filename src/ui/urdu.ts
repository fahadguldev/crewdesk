/**
 * Urdu Nastaliq Wordmark Utility
 * Ensures that wherever the word "daftar", "Daftar", "daftars", "Daftars", or "دفتر"
 * is used anywhere on the website, it is rendered in authentic Urdu Nastaliq
 * font ('دفتر') and styled in emerald green (var(--accent-2)).
 */

export function createUrduDaftarElement(): HTMLElement {
  const span = document.createElement('span');
  span.className = 'urdu';
  span.setAttribute('dir', 'rtl');
  span.setAttribute('lang', 'ur');
  const bdi = document.createElement('bdi');
  bdi.textContent = 'دفتر';
  span.appendChild(bdi);
  return span;
}

export function applyUrduDaftar(root: HTMLElement = document.body): void {
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      // Skip form inputs, options, textareas, code, script, style, and nodes already inside .urdu
      if (['script', 'style', 'textarea', 'input', 'option', 'code', 'pre'].includes(tag)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (parent.closest('.urdu') || parent.classList.contains('urdu')) {
        return NodeFilter.FILTER_REJECT;
      }
      // Never alter mailto links, domain links, or text containing email addresses / URLs
      if (tag === 'a') {
        const href = parent.getAttribute('href') ?? '';
        if (href.startsWith('mailto:') || href.includes('daftarhub.app') || href.startsWith('http')) {
          return NodeFilter.FILTER_REJECT;
        }
      }
      const val = node.nodeValue ?? '';
      if (/@|daftarhub.app/i.test(val)) {
        return NodeFilter.FILTER_REJECT;
      }
      // Check if text node contains standalone daftar (case-insensitive) or Urdu دفتر
      if (/(\bdaftars?\b|دفتر)/i.test(val)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    }
  });

  const nodesToReplace: Text[] = [];
  while (walker.nextNode()) {
    nodesToReplace.push(walker.currentNode as Text);
  }

  for (const textNode of nodesToReplace) {
    const text = textNode.nodeValue ?? '';
    const fragment = document.createDocumentFragment();
    // Match standalone 'daftars', 'daftar', 'Daftars', 'Daftar', 'DAFTAR', or Urdu 'دفتر'
    const regex = /(\bdaftars?\b|دفتر)/gi;
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        fragment.appendChild(document.createTextNode(text.substring(lastIdx, match.index)));
      }

      fragment.appendChild(createUrduDaftarElement());
      lastIdx = regex.lastIndex;
    }

    if (lastIdx < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIdx)));
    }

    textNode.parentNode?.replaceChild(fragment, textNode);
  }
}
