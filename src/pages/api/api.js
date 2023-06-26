const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

const commonAPICall = async (
  PATH,
  METHOD = "GET",
  BODY = null,
  headers = {
    accept: "*/*",
    "Content-Type": "application/json",
  }
) => {
  var FULLPATH = BASE_URL + PATH;
  const response = await fetch(FULLPATH, {
    method: METHOD,
    body: BODY,
    headers: headers,
    credentials: "include",
  });

  return response;
};

const getAPI = async (PATH) => {
  const response = await commonAPICall(PATH);
  try {
    response.data = await response.json();
  } catch (err) {
    console.log(err);
  }
  return response;
};

const postAPI = async (PATH, DATA) => {
  var serializedData = JSON.stringify(DATA);
  const response = await commonAPICall(PATH, "POST", serializedData);
  try {
    response.data = await response.json();
  } catch (err) {
    console.log(err);
  }
  return response;
};

const deleteAPI = async (PATH) => {
  const response = await commonAPICall(PATH, "DELETE");
  try {
    response.data = await response.json();
  } catch (err) {
    console.log(err);
  }
  return response;
};

const getProfile = async () => {
  const response = await getAPI("/profile");
  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}. Message: ${response.data.error}`
    );
  }
  return response;
};

const loginSubmit = async (email, password) => {
  const response = await postAPI("/login", {
    email: email,
    password: password,
  });
  return response;
};
const registerSubmit = async (email, password) => {
  const response = await postAPI("/register-user", {
    email: email,
    password: password,
  });
  return response;
};

export {
  commonAPICall,
  getAPI,
  postAPI,
  getProfile,
  loginSubmit,
  registerSubmit,
};
