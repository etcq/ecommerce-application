const editNameView = (name: string | undefined): string => {
  if (name === undefined || name.length === 0) return 'Anonymous';
  if (name.length > 10) return `${name.slice(0, 10)}...`;
  return name;
};

export default editNameView;
