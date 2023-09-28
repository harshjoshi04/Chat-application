export const HOST = "https://gear-chat-wip6.onrender.com";

const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGE_ROUTE = `${HOST}/api/messages`;

export const LOGIN_USER = `${AUTH_ROUTE}/login-user`;
export const CHEACK_USER_ROUTE = `${AUTH_ROUTE}/cheack-user`;
export const ONBORD_USER_ROUTE = `${AUTH_ROUTE}/onbord-user`;
export const IMAGE_UPLOAD = `${AUTH_ROUTE}/upload-image`;
export const GETALL_CONTACTS = `${AUTH_ROUTE}/getall-user`;
export const MESSAGE_ADD = `${MESSAGE_ROUTE}/add-message`;
export const GET_MESSAGE = `${MESSAGE_ROUTE}/get-message`;
export const GET_CHAT_DATA = `${MESSAGE_ROUTE}/get-chatmessage`;
export const CHANGE_ACTIVE = `${MESSAGE_ROUTE}/change-active`;
export const CHANGE_UNACTIVE = `${MESSAGE_ROUTE}/change-unactive`;
