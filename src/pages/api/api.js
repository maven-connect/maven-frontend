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
  var FULLPATH = new URL(PATH, BASE_URL).toString();
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

const logoutRequest = async () => {
  const response = await postAPI("/logout");
  return response;
};

const registerSubmit = async (email, password) => {
  const response = await postAPI("/register-user", {
    email: email,
    password: password,
  });
  return response;
};

const googeLogin = async (idToken) => {
  const response = await postAPI("/google-login", {
    id_token: idToken,
  });
  return response;
};

const verifyProfile = async (branch, batch) => {
  const response = await postAPI("/verify-user", {
    branch: branch,
    batch: batch,
  });
  return response;
};

const fetchUserGroups = async () => {
  const response = await getAPI("/group/joined");
  if (!response.ok) {
    throw new Error("Profile incomplete.");
  }
  return response;
};

const fetchUserMessages = async (groupName) => {
  const response = await getAPI(`/group/${groupName}/messages`);
  if (!response.ok) {
    throw new Error("Failed to fetch Messages");
  }
  return response;
};

export {
  commonAPICall,
  getAPI,
  postAPI,
  getProfile,
  loginSubmit,
  logoutRequest,
  registerSubmit,
  googeLogin,
  verifyProfile,
  fetchUserGroups,
  fetchUserMessages,
};
