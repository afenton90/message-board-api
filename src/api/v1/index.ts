import express from 'express';

import messageAPI from './message';

const router = express.Router();

router.use('/message', messageAPI);

export default router;
