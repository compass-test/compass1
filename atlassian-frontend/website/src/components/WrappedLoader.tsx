import Loadable from 'react-loadable';

const WrappedLoadable = <Props2, Exports extends object>({
  render,
  ...rest
}: Loadable.OptionsWithRender<Props2, Exports>) =>
  Loadable({
    ...rest,
    render: (loaded: Exports, props: Props2) => render(loaded, props),
  });

export default WrappedLoadable;
