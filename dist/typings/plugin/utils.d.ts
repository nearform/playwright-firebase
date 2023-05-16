import { User } from 'firebase/auth';
interface AuthSave {
    key: string;
    value: object;
}
declare const saveAuth: (user: User, apiKey: string) => AuthSave;
export { saveAuth };
//# sourceMappingURL=utils.d.ts.map