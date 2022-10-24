import Handlebars from 'handlebars';
import Block from './Block';

export default function compileComponent(source: string, props: any) {
  const parser = new DOMParser();
  const fragment = document.createElement('template');

  const components: Record<string, Block<any>> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (value instanceof Block) {
      components[value.id] = value;

      try {
        props[key] = `<div id="id-${value.id}"></div>`;
      } catch (err) {
        console.log(err);
      }
    }
  });

  fragment.innerHTML = parser.parseFromString(
    Handlebars.compile(source)(props),
    'text/html',
  ).body.innerHTML;

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#id-${id}`);
    if (!stub) {
      return;
    }
    stub.replaceWith(component.getContent());
  });

  return fragment.content;
}
