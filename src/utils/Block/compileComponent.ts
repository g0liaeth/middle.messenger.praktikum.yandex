import Handlebars from 'handlebars';
import Block from './Block';

export default function compileComponent(source: string, props: Record<string, any>) {
  const propsWithStubs = { ...props };
  const components: Record<string, Block<any>> = {};

  Object.entries(propsWithStubs).forEach(([key, value]) => {
    if (value instanceof Block) {
      components[value.getId()] = value;

      try {
        propsWithStubs[key] = `<div id="id-${value.getId()}"></div>`;
      } catch (err) {
        console.log(err);
      }
    }
    if (value instanceof Array) {
      const multiValues: string[] = [];
      Object.values(value).forEach((v) => {
        if (v instanceof Block) {
          components[v.getId()] = v;

          multiValues.push(`<div id="id-${v.getId()}"></div>`);
        }
      });
      if (multiValues.length) {
        try {
          propsWithStubs[key] = multiValues.join('');
        } catch (err) {
          console.log(err);
        }
      }
    }
  });

  const fragment = document.createElement('template');
  fragment.innerHTML = Handlebars.compile(source)(propsWithStubs);

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#id-${id}`);
    if (stub) {
      stub.replaceWith(component.getContent());
    }
  });

  return fragment.content;
}
