const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USER_ID = 'user-id'
const STAY_ON = 'stay-on'

export const setTokens = ({
  expiresIn = 3600,
  idToken,
  refreshToken,
  stayOn = false,
  localId
}) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(TOKEN_KEY, idToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
  localStorage.setItem(STAY_ON, stayOn)
  localStorage.setItem(USER_ID, localId)
}

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY)
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY)
export const getExpiresKeyToken = () => localStorage.getItem(EXPIRES_KEY)
export const getStayOn = () => localStorage.getItem(STAY_ON)
export const getUserId = () => localStorage.getItem(USER_ID)

export const removeAuthData = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(STAY_ON)
  localStorage.removeItem(USER_ID)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresKeyToken,
  getUserId,
  removeAuthData
}

export default localStorageService
