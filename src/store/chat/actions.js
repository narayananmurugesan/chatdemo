import * as types from './actionTypes'

export const addChat = (message) => {
    return (dispatch) => {
      dispatch(addChatMessage(message))
    }
  }


  const addChatMessage = message => ({
    type: types.ADD,
    message
  })