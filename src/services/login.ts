import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  grant_type: string;
  scope: string;
  userType: Number;
  // "username":  "admin",
  // "password":  "elcrD28ZSLLtR0VLs/jERA==",
  // "grant_type":  "password",
  // "scope":  "server",
  // "userType":  1
}

// export async function fakeAccountLogin(params: LoginParamsType) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/auth/oauth/token', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function userLogout() {
  return request('/auth/oauth/token', {
    method: 'delete',
  });
}
