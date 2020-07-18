import * as types from './actionTypes'

const initialState = {
  chatRoom: []
}

const chat = (state = initialState, action) => {
  switch(action.type) {
    case types.ADD:
      state.chatRoom.push(action.message);
      return { ...state}
    default:
      return state
  }
}

export default chat
