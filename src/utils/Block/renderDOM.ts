import Block from './Block';

export default function renderDOM(query: string, block: Block<any>): void {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error('Root element not found');
  }

  root.append(block.getContent());
}
