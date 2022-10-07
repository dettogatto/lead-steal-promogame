// export const ENV = 'prod';
export const ENV = 'dev';

let apiUrl = process.env.PUBLIC_URL + '/php/';
if(ENV === 'dev' || ENV === 'test'){
  apiUrl = 'http://localhost/apis/leaderboard/';
}

let routerBasename = '/bcweek';
if(ENV === 'dev' || ENV === 'test'){
  routerBasename = '/';
}

export const ROUTER_BASENAME = routerBasename;

export const API_URL = apiUrl;

export const LEADERBOARD_REFRESH_INTERVAL = 5000;

export const LOCALSTORAGE_EMAIL_FIELD = 'rc_user_email';
