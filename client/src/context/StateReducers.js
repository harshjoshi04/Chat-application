import { reducerCases } from "./constants";

export const initialstate = {
  userinfo: undefined,
  newUser: false,
  contactsPage: false,
  currentChatUser: undefined,
  messages: [],
  socket: undefined,
  chatMember: [],
  MemberActive: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userinfo: action.userinfo,
      };
    case reducerCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action.newUser,
      };
    case reducerCases.SET_ALL_CONTECTS:
      return {
        ...state,
        contactsPage: !state.contactsPage,
      };
    case reducerCases.CURRENT_CHAT_USER:
      return {
        ...state,
        currentChatUser: action.user,
      };
    case reducerCases.SET_MESSAGE:
      return {
        ...state,
        messages: action.mess,
      };
    case reducerCases.SET_SOCKET:
      return {
        ...state,
        socket: action.socketRef,
      };
    case reducerCases.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    case reducerCases.ALL_MEMBER: {
      return {
        ...state,
        chatMember: action.data,
      };
    }
    case reducerCases.MEMBER_ACTIVE:
      return {
        ...state,
        MemberActive: !MemberActive,
      };
    default:
      return 0;
  }
};

export default reducer;
