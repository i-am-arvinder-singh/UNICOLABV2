import * as admin from 'firebase-admin'

var serviceAccount = require('./unicolab-firebase-adminsdk-lz2t6-2138836f92.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://unicolab-default-rtdb.firebaseio.com/"
})