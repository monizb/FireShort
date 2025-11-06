// New selector utility: selectRandomUrl
export const selectRandomUrl = (state) => {
  const urls = state.links && state.links.items ? state.links.items : [];
  if (urls.length === 0) return null;
  return urls[Math.floor(Math.random() * urls.length)];
};
export const getFilteredLinks = (links, { text }) => {
  return links.filter((link) => {
    const textMatch =
      text === '' || link.data.curl.toLowerCase().includes(text.toLowerCase());

    return textMatch;
  });
};
