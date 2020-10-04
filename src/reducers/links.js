const linkReducerDefaultState = [];

export default (state=linkReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_LINK':
      return [...state, action.shortUrl];
    case 'SET_LINK':
      return action.shortUrl;
    default:
      return state;
  }
};
