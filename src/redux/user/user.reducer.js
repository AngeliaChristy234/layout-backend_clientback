import { userActionTypes } from './user.actions'

const INITIAL_DATA = {
  currentUserId: 0,
  currentUtilsId: 0
}

// SELECTORS
export const loggedUserIdSelector = state => state.users.currentUserId,
             loggedUtilsIdSelector = state => state.users.currentUtilsId

// REDUCERS
const userReducer = (state = INITIAL_DATA, action) => {
  switch(action.type) {
    case userActionTypes.LOGGED_USER:
      return {
        ...state,
        currentUserId: action.payload.usID,
        currentUtilsId: action.payload.utID
      }

    default:
      return state;
  }
}

export default userReducer;
