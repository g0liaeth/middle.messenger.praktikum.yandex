import Handlebars from 'handlebars';
import Block from './Block';

// export default function compileComponent(source: string, props: any) {
//   const parser = new DOMParser();

//   return parser.parseFromString(Handlebars.compile(source)(props), 'text/html').body
//     .firstChild as HTMLElement;
// }

export default function compileComponent(source: string, props: any) {
  const parser = new DOMParser();
  const fragment = document.createElement('template');
  const components: Record<string, Block<any>> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (value instanceof Block) {
      components[value.id] = value;

      try {
        props[key] = `<div id="id-${value.id}"></div>`;
      } catch (err) {}
    }
    if (value instanceof Array) {
      const multiValues: string[] = [];
      Object.values(value).forEach((v) => {
        if (v instanceof Block) {
          components[v.id] = v;
          multiValues.push(`<div id="id-${v.id}"></div>`);
        }
      });
      if (multiValues.length) {
        props[key] = multiValues.join('');
      }
    }
  });

  
  fragment.innerHTML = parser.parseFromString(Handlebars.compile(source)(props), 'text/html').body.innerHTML;

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#id-${id}`);
    if (!stub) {
      return;
    }
    stub.replaceWith(component.getContent());
  });

  return fragment.content;
}
