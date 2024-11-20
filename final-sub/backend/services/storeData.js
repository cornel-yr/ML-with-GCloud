const { Firestore } = require('@google-cloud/firestore');


async function storeData(id, data) {
    const db = new Firestore(
      // projectId: process.env.GCLOUD_PROJECT, // Pastikan projectId diatur dengan benar
      // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Gunakan kredensial dari .env
      );
   
    const predictCollection = db.collection('predictions');
    return predictCollection.doc(id).set(data);
  }
   
  module.exports = storeData;