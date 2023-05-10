import { test, expect } from '@jest/globals';
import { saveAuth } from '../plugin/utils.js';
import { readFileSync } from 'fs';
import { getUser } from './helpers/mock_firebase_impl.js';
test('2+2=4', () => {
    expect(2 + 2).toBe(4);
});
test('Session storage can be written into', async () => {
    const API_KEY = 'test-api-key';
    const user = await getUser();
    if (user) {
        saveAuth(user, API_KEY);
    }
    const authState = JSON.parse(readFileSync('./plugin/.auth/session.json').toString());
    expect(authState.key).toBe(`firebase:authUser:${API_KEY}:[DEFAULT]`);
});
