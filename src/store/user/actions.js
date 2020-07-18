import * as types from './actionTypes'

export const addUser = (message) => {
    return (dispatch) => {
      dispatch(addUserList(message))
    }
  }

  export const updateUser = (message) => {
    return (dispatch) => {
      dispatch(updateUserList(message))
    }
  }

  const addUserList = message => ({
    type: types.ADDUSER,
    message
  })

  const updateUserList = message => ({
    type: types.UPDATEUSER,
    message
  })