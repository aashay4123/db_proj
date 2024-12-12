import axiosInstance from "./axios_interceptor";

export const getAction = async (route, callback) => {
  try {
    const res = await axiosInstance.get(route);
    if (callback) callback(res);
    return res;
  } catch (err) {
    if (callback) callback(err);
    return err.response;
  }
};

export const postAction = async (route, data, callback) => {
  try {
    const res = await axiosInstance.post(route, data);
    if (callback) callback(res);
    return res;
  } catch (err) {
    if (callback) callback(err.response);
    return err.response;
  }
};

export const patchAction = async (route, data, callback) => {
  try {
    const res = await axiosInstance.patch(route, data);
    if (callback) callback(res);
    return res;
  } catch (err) {
    if (callback) callback(err);
    return err.response;
  }
};

export const deleteAction = async (route, callback) => {
  try {
    const res = await axiosInstance.delete(route);
    if (callback) callback(res);
    return res;
  } catch (err) {
    if (callback) callback(err);
    return err.response;
  }
};
