import { App } from '@/app';
import { UserRoute } from '@/routes/users';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new UserRoute()]);

app.listen();
