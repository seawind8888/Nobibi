export interface User {
  _id?: string,
  userName?: string,
  password?: string,
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
  avatar?:string,
  topicTitle?: string,
  content?: string,
  total?: number,
  list?: object[],
  page?: number,
  type?: string,
  commentNum?: number,
  praiseNum?: number,
  userName?: string,
  userAvatar?: string,
  updateTime?: string,
  categoryName?: string
}