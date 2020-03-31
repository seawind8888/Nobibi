export interface User {
  _id?: string,
  userName?: string,
  avatar?: string,
  email?: string,
  visit?: number[],
  status?: string,
  refUserRoleCode?: string,
  createTime?: string,
  updateTime?: string
}

export interface Topic {
  _id?: string,
  topicTitle?: string,
  content?: string,
  total?: number,
  list?: object[],
  page?: number,
  type?: string,
  userName?: string,
  userAvatar?: string,
  updateTime?: string,
  categoryName?: string
}