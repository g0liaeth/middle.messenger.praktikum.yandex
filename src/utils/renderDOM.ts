import Block from './Block';

export default function renderDOM<TProps>(query: string, block: Block<TProps>): void {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error('Root element not found');
  }

  root.innerHTML = '';

  root.append(block.getContent());
}
