export const transientOptions = {
  shouldForwardProp: (propName) => !propName.startsWith('$'),
};

export default transientOptions;
