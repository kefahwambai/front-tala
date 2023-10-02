import csrfFetch from "../Authentication/csfr";

const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});

const storeCSRFToken = (res) => {
  const csrfToken = res.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

const storeCurrentUser = (user) => {
  if (user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    sessionStorage.removeItem("currentUser");
  }
};

export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const res = await csrfFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  // console.log(data)
  storeCurrentUser(data.name);
  dispatch(setCurrentUser(data.name));
  return res;
};

export const logout = () => async (dispatch) => {
    const res = await csrfFetch("/logout", {
      method: "DELETE"
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return res;
};

export const signup = (user) => async (dispatch) => {
  const { name, email, password } = user;
  const res = await csrfFetch("/signup", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      
    })
  });
  console.log("Response status:", res.status);
  const text = await res.text();
  // console.log("Response text:", text);
  const data = await res.json();
  // console.log("Response JSON data:", data); 
  return res;
};

export const ForgotPassword = (user) => async (dispatch) => {
  const { email } = user;

  try {    
    const res = await csrfFetch("/password_resets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfFetch,
      },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {     
      throw new Error("Password reset request failed");
    }   
    const data = await res.json();
    
  } catch (error) {
    console.error("Password reset error:", error);
  }
};


export const restoreSession = () => async (dispatch) => {
  try {
    const res = await csrfFetch("api/session");    
    if (!res.ok) {    
      throw new Error('Failed to fetch session');
    }
    
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.name);
    dispatch(setCurrentUser(data.name));
    return res;
  } catch (error) {   
    console.error('Error restoring session:', error);
   
    throw error;
  }
};

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case SET_CURRENT_USER:
      newState.user = action.name;
      return newState;
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;



