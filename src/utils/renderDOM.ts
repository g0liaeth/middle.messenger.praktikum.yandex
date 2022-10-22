import Block from './Block';

export default function renderDOM<TProps>(query: string, block: Block<TProps>): void {
  const root = document.querySelector(query) as HTMLElement;

  root.append(block.getContent());
}
