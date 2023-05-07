import { post } from '@utils/request';

export const registerUser = (params) => post('/api/accounts/signup', params);

// ren996607062