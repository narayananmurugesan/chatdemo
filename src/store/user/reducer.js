import * as types from './actionTypes'

const initialState = {
  userList: []
}

const user = (state = initialState, action) => {
  switch(action.type) {
    case types.ADDUSER:
      state.userList.push(action.message);
      return {...state};
    case types.UPDATEUSER:
      let indexValue = -1;
      state.userList.map((a, index)=>{
        if (a.userId == action.message.userId) {
          indexValue = index
        }
      });
      if(indexValue>-1){
        state.userList.splice(indexValue, 1, action.message);
      }
      
      // state.userList.push(action.message);
      return {...state};
    default:
      return state
  }
}


export default user
