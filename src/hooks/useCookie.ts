import Cookies from "js-cookie";

const useCookie = () => {
  const GetCookie = (name: string) => {
    const cookie = Cookies.get(name);
    if (cookie) return cookie;
    else return null;
  };

  const SaveCookie = (name: string, value: string) => {
    Cookies.set(name, value, { secure: false });
  };
  const SaveCookieWithExpireTime = (
    name: string,
    value: string,
    dayTime: number,
  ) => {
    Cookies.set(name, value, { secure: false, expires: dayTime });
  };

  const DeleteCookie = (name: string) => {
    Cookies.remove(name);
  };

  return {
    GetCookie,
    SaveCookie,
    SaveCookieWithExpireTime,
    DeleteCookie,
  };
};

export default useCookie;
