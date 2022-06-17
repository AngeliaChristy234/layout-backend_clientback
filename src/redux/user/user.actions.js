export const userActionTypes = {
  LOGGED_USER: 'LOGGED_USER'
}

export const storeLoggedUser = (usID, utID) => ({
  type: userActionTypes.LOGGED_USER,
  payload: {
    usID,
    utID
  }
})
