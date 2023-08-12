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

const fetchGroupData = async (groupName) => {
  const response = await getAPI(`/group/${groupName}/data`);
  if (!response.ok) {
    throw new Error("Failed to fetch Messages");
  }
  return response;
};

const createGroup = async ({
  group_name,
  group_batch,
  group_branch,
  description,
}) => {
  const body = { name: group_name, batch: group_batch };
  if (group_branch) {
    body.branch = group_branch;
  }

  if (description) {
    body.description = description;
  }

  const response = await postAPI(`/group/new`, body);
  if (!response.ok) {
    throw new Error("Failed to fetch Messages");
  }
  return response;
};

const getGroupParticipants = async (groupName) => {
  const response = await getAPI(`/group/${groupName}/participants`);
  if (!response.ok) {
    throw new Error("Failed to fetch participants");
  }
  return response;
};

const postLostandFound = async ({
  itemName,
  description,
  imageFile,
  selectedOption,
}) => {
  let formData = new FormData();
  formData.append("name", itemName);
  formData.append("description", description);
  formData.append("image_url", imageFile);
  formData.append("category", selectedOption);

  const Headers = {
    accept: "*/*",
  };
  console.log(itemName, description, imageFile, selectedOption);
  console.log(formData);
  const response = await commonAPICall(
    `/lost-found/create`,
    "POST",
    formData,
    Headers
  );
  if (!response.ok) {
    throw new Error("Failed to fetch participants");
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
  fetchGroupData,
  createGroup,
  getGroupParticipants,
  postLostandFound,
};
