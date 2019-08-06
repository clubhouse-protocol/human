type Setup = () => void;
const setup: Setup = () => {};

(window as any).navigator = {
  userAgent: '',
};

export {
  Setup,
};

export default setup;