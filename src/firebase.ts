import * as firebaseAdmin from 'firebase-admin';

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    // @ts-ignore
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
});

const decodeIDToken = async (ctx: any) => {
  const Authorization = (ctx.req || ctx.request).get('Authorization');
  const token = Authorization?.replace('Bearer ', '');

  if (!token) {
    console.error('token was not provided');
    return null;
  }

  try {
    console.log(`verifying token ${token.slice(0, 5)}...`);
    const verified = await admin.auth().verifyIdToken(token);
    console.log('verified');
    return verified;
  } catch (err) {
    console.error('err', err);
    return null;
  }
};

export { decodeIDToken };
