import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface DecodedToken {
  name: string;
  picture: string;
  sub: string;
}

const decodeJwt = (token: string): DecodedToken => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const createOrGetUser = async (response: any,addUser: any) => {
  // console.log(response.credential);

  const decoded = decodeJwt(response.credential);

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };

  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
