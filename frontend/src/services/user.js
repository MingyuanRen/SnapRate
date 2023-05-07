import { get, post, put } from '@utils/request';

/**
 * 更新用户信息
 * @param {*} userId
 * @param {*} params
 */
export const editUser = (userId, params) => put(`/api/profiles/${userId}`, params);

// 关注某个用户
export const followUser = (userId) => post(`/api/friendships/${userId}/follow`);

// 取关某个用户
export const unFollowUser = (userId) => post(`/api/friendships/${userId}/unfollow`);

// 获取粉丝
export const getFollowers = (userId) => get(`/api/friendships/${userId}/followers`);

// 获取我的关注
export const getFollowings = (userId) => get(`/api/friendships/${userId}/followings`);
