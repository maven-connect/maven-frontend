const BASE_URL = '/masterbackend';

const commonAPICall = async (
  PATH,
  METHOD = 'GET',
  BODY = null,
  headers = {
    accept: '*/*',
    'Content-Type': 'application/json',
  }
) => {
  var FULLPATH = BASE_URL + PATH;
  const response = await fetch(FULLPATH, {
    method: METHOD,
    body: BODY,
    headers: headers,
  });

  return response;
};

const getAPI = async (PATH) => {
  const response = await commonAPICall(PATH);
  response.data = await response.json();
  return response;
};

const postAPI = async (PATH, DATA) => {
  var serializedData = JSON.stringify(DATA);
  const response = await commonAPICall(PATH, 'POST', serializedData);
  try {
    response.data = await response.json();
  } catch (err) {
    console.log(err);
  }
  return response;
};

const deleteAPI = async (PATH) => {
  const response = await commonAPICall(PATH, 'DELETE');
  try {
    response.data = await response.json();
  } catch (err) {
    console.log(err);
  }
  return response;
};

const getProfile = async () => {
  const response = await getAPI('/api/profile/');
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response;
};

export {commonAPICall, getAPI, postAPI, getProfile};
