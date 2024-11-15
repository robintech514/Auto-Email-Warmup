import express from 'express';
import { configureEmail } from '../controllers/emailController.js';
import { getEmailStatus } from '../controllers/getEmailStatus.js';

const router = express.Router();

router.post('/configure', configureEmail);
router.get('/:email', getEmailStatus);

export default router;
