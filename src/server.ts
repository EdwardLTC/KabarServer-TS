import { App } from '@/app';
import { UserRoute } from '@/routes/users';
import { ValidateEnv } from '@utils/validateEnv';
import { AuthRoute } from './routes/auth';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute()]);

app.listen();
