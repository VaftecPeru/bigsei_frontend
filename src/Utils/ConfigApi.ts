const prodBaseURL = "https://intranet.bigsei.com/public/api";
const devBaseURL = "http://localhost:8000/api";
const hostname = window.location.hostname;
const baseURL = (prodBaseURL.indexOf(hostname) != -1) ? prodBaseURL : devBaseURL;

const configApi = {
  baseURL: baseURL,
};

export default configApi;