var admin = require('firebase-admin');

var serviceAccount = require('./unicolab-firebase-adminsdk-credentials.json')

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://unicolab-default-rtdb.firebaseio.com/"
})

const auth = firebaseApp.auth();

module.exports = {auth,firebaseApp};