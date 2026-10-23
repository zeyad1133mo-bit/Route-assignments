import { logger } from './src/common/logger/logger.js';
import { AppError } from './src/common/error/error.js';

console.log('=== info (works fine) ===');
logger.info('Server is running on port 3000');

console.log('=== error with PLAIN Error (like auth/errors.js) ===');
const plain = new Error('invalid code');
console.log('spread of plain Error:', JSON.stringify({ ...plain }));
logger.error(plain.message, plain);

console.log('=== error with AppError (like user/errors.js) ===');
const appErr = new AppError('user already exist', 409);
console.log('spread of AppError:', JSON.stringify({ ...appErr }));
logger.error(appErr.message, appErr);
