import { User } from 'firebase/auth';
import { UserCredentials } from '../tests/helpers/authentication.js';
interface AuthSave {
    key: string;
    value: object;
}
declare const formatAuth: (user: User | UserCredentials, apiKey: string) => AuthSave;
export { formatAuth };
//# sourceMappingURL=utils.d.ts.map