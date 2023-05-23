const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const STAY_ON = 'stay-on'

export const setTokens = ({
  expiresIn = 3600,
  idToken,
  refreshToken,
  stayOn = false
}) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(TOKEN_KEY, idToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
  localStorage.setItem(STAY_ON, stayOn)
}

//export const setCurrentUserToLocalStorage = user

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY)
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY)
export const getExpiresKeyToken = () => localStorage.getItem(EXPIRES_KEY)
export const getStayOn = () => localStorage.getItem(STAY_ON)

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresKeyToken
}

export default localStorageService
