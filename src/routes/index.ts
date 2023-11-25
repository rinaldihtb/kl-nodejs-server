import {Router as iRouter} from 'express';
import api from './api';
const router = iRouter();


router.use('/api/v1', api);
// Router.use("/", api);
// router.get("/", api.route);

export default router;
