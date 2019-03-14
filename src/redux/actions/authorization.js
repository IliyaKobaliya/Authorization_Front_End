export const AUTH_TEST = "AUTH_TEST";

export const testAuthorization = (email,token) =>({
    type: AUTH_TEST,
    payload: {email,token}
});