const filterReducerDefaultState = {
  text: ''
};

export default (state=filterReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    default:
      return state;
  }
}; 
