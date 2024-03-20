export const MONGO_URL = process.env.MONGO_URL || '';
export const PORT = process.env.PORT || 3500;
export const ACCEPTED_LANGUAGES = ['en', 'vi'];


export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY || '';
export const S3_SECRET_KEY = process.env.S3_SECRET_KEY || '';
export const S3_API_VERSION = process.env.S3_API_VERSION || '2006-03-01';
export const S3_REGION = process.env.S3_REGION || 'ap-southeast-1';
export const S3_BUCKET = process.env.S3_BUCKET || '';

export const ZALO_ACCOUNTS = process.env.ZALO_ACCOUNTS || '1242567605949002428';
export const ZALO_API = 'https://openapi.zalo.me';
export const ZALO_OA_TOKEN = process.env.ZALO_OA_TOKEN;

export const SUPPORTED_CITIES = process.env.SUPPORTED_CITIES ? String(process.env.SUPPORTED_CITIES).split(',') : ['48'];

export const EMAIL_ADMIN_LIST = ['whc.test22@gmail.com'];
export const SMTP_SERVER = process.env.SMTP_SERVER;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const EMAIL_SEND_FROM = process.env.EMAIL_SEND_FROM || 'support@worldcare.vn';

export const AWS_SES_REGION = process.env.AWS_SES_REGION || '';
export const SMTP_AWS_ACCESS_KEYPASSWORD = process.env.SMTP_AWS_ACCESS_KEYPASSWORD || '';
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || '';

export const FIREBASE = {
  VERIFY_ENDPOINT: process.env.FIREBASE_VERIFY_ENDPOINT || 'https://www.googleapis.com/identitytoolkit/v3/relyingparty',
  API_KEY: process.env.FIREBASE_API_KEY || '',
};

// export const BO_CLIENT_URL = process.env.BO_CLIENT_URL || 'https://worldcare-dashboard.web.app'
export const BO_CLIENT_URL = process.env.BO_CLIENT_URL || 'https://dashboard.worldcare.vn'

export const CLIENT_URL = process.env.CLIENT_URL || 'https://worldcare.vn'

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
export const TELEGRAM_API_BASE_URL = process.env.TELEGRAM_API_BASE_URL || 'https://api.telegram.org'
export const TELEGRAM_GROUP_CHAT_ID = process.env.TELEGRAM_GROUP_CHAT_ID || ''

export const ZALO_APP_ID = process.env.ZALO_APP_ID || '';
export const REFRESH_ACCESS_TOKEN_URL = process.env.REFRESH_ACCESS_TOKEN_URL || 'https://oauth.zaloapp.com/v4/oa/access_token';
export const ZALO_APP_SECRET_KEY = process.env.ZALO_APP_SECRET_KEY || '';

export const PHARMACY_URL = process.env.PHARMACY_URL || '';
export const LOGIN_PARTNER_URL = process.env.LOGIN_PARTNER_URL || 'https://dashboard.worldcare.vn/login-workspace'


export const RABBITMQ_URL = process.env.RABBITMQ_URL || ''

export const HERE_MAP_API_KEY = process.env.HERE_MAP_API_KEY || 'qxQNSzuLr8cynsA4TqLEydtH4pYCAHxIdCmdrzcmFOk'

export const HERE_MAP_GEOCODE_API_URL = process.env.HERE_MAP_GEOCODE_API_URL || 'https://geocode.search.hereapi.com'
export const FIREBASE_FCM_SERVER_KEY = process.env.FIREBASE_FCM_SERVER_KEY || 'AAAAsb9383I:APA91bEwEMClwQ-UkDtFrmQEmVTiZpwDl_QLH-0Ycvf0I6APbd1LFL1W-kdMNflHP_vdCMBg4X9T6GB7rEBb2wI9_ObE0Um69NeYbXsRmJ1iFdgPx-OWw3CK5LvNc-HN-m6SWldC7c4U'
