export interface UserResponse {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}
export interface SignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}
export interface SignInRequest {
  login: string;
  password: string;
}
export interface SignUpResponse {
  id: number;
}
export interface CreateChatRequest {
  title: string;
}
export interface UsersRequest {
  users: number[];
  chatId: number;
}
export interface ChatsResponse {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: UserResponse;
    time: string;
    content: string;
  };
}
export interface ChatDeleteRequest {
  chatId: number;
}
export interface ChatDeleteResponse {
  userId: number;
  result: ChatsResponse;
}
export interface ChatArchiveRequest {
  chatId: number;
}
export interface ChatArchiveResponse {
  userId: number;
  result: ChatsResponse;
}
export interface ChatsMessagesTokenResponse {
  token: string;
}
export interface UnreadCountResponse {
  unread_count: number;
}
export interface LeaderboardNewLeaderRequest {
  data: { description: unknown };
  ratingFieldName: string;
  teamName: string;
}
export interface LeaderboardRequest {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}
export interface OauthSignInRequest {
  code: string;
  redirect_uri: string;
}
export interface ServiceId {
  service_id: string;
}
export interface HttpErrorBody {
  reason: string;
}
export interface UserUpdateRequest {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}
export interface UserRequest {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}
export interface FindUserRequest {
  login: string;
}
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export interface Resource {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}
export interface ChatMessage {
  id?: number;
  user_id: number;
  chat_id?: number;
  time: string;
  type: "message" | "file";
  content: string;
  file?: Resource;
  isOwned?: boolean;
}
export interface ChatUserResponse {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  role: "admin" | "regular";
}
export interface StaticChartRequest {
  chartSize: "small" | "medium" | "large";
}
export interface LiveChartRequest {
  next: number;
}
export interface ChartSchema {
  x: string;
  y1: number;
  y2: number;
}
export interface StaticChartResponse {
  data: ChartSchema;
}
export interface LiveChartResponse {
  next: number;
  data: ChartSchema;
}
export interface LiveVideoInfoRequest {
  iteration: number;
}
export interface VideoInfoResponse {
  size: number;
}
export interface Sticker {
  id: number;
  path: string;
}
export interface StickerPack {
  title: string;
  user_id: number;
  stickers: string[];
}
export interface StickerPacksResponse {
  data: StickerPack[];
}
export interface StickersResponse {
  data: Sticker[];
}
export interface GetChatRequest {
  offset?: number;
  limit?: number;
  title?: string;
}
export interface DeleteChatRequest {
  chatId: number;
}
export interface GetChatUsersRequest {
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
}
export interface SetChatAvatarRequest {
  chatId: number;
  avatar: FormData;
}
