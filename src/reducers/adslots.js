const initialState = {
  data: [],
  searchText: '',
  typeFilter: 'all',
  formatFilter: 'all',
  message: ''
}

export default function adslots(state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case 'ADSLOT_LIST_SAVE':
      newState.data = action.adslots;
      newState.message = '';
      return newState;

    case 'ADSLOT_ADD_SAVE':
      newState.data = [...state.data, action.adslot]
      return newState;

    case 'ADSLOT_EDIT_SAVE':
      const newData = state.data.map(adslot =>
        Number(adslot.id) === Number(action.adslot.id) ? {...action.adslot} : adslot
      );
      newState.data = newData;
      return newState;

    case 'ADSLOT_SEARCH_TEXT':
      newState.searchText = action.data;
      return newState;

    case 'ADSLOT_TYPE_FILTER':
      newState.typeFilter = action.data;
      return newState;

    case 'ADSLOT_FORMAT_FILTER':
      newState.formatFilter = action.data;
      return newState;

    case 'ADSLOT_FORMAT_FILTER':
      newState.formatFilter = action.data;
      return newState;

    case 'ADSLOT_FORMAT_FILTER':
      newState.formatFilter = action.data;
      return newState;

    case 'ADSLOT_SUCCESS':
      newState.message = action.data;
      return newState;

    default:
      return state;
  }
}
