export const getFilteredLinks = (links, { text }) => {
  return links.filter((link) => {
    const textMatch =
      text === '' || link.data.curl.toLowerCase().includes(text.toLowerCase());

    return textMatch;
  });
};
