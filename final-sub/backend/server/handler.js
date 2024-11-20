const predictCancer = require('../services/interfaceService'); 
const crypto = require('crypto');   //untuk uuid
const storeData = require('../services/storeData');
const { Firestore } = require('@google-cloud/firestore');
 
async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;
 
    try {
        const { result, suggestion } = await predictCancer(model, image);
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        // deklarasi data -> cancer atau tidak
        const data = {
            "id": id,
            "result": result,
            "suggestion": suggestion,
            "createdAt": createdAt
        }
        await storeData(id, data); // save to firestore 

        // jika berhasil predict
        const respone = h.response({
            status: 'success',
            message: "Model is predicted successfully",
            data
        });
        respone.code(201); 
    
        return respone;

    } catch (error) {
        // jika ukuran payload lebih dr 1mb (diatur di server.js)  --> dipindah ke server.js
        // if (error.message.includes('Payload content length greater than maximum allowed')) {
        //     const response = h.response({
        //         status: 'fail',
        //         message: 'Payload content length greater than maximum allowed: 1000000',
        //     })
        //     response.code(413);
        //     return response;
        // }

        const response = h.response({
            status: 'fail',
            message: error.message, // ambil error message dari interfaceService.js
        })
        response.code(400);
        return response;
    }
}

async function getHistory(request, h) {
    const db = new Firestore();
    const predictCollection = db.collection('predictions');
    const snapshot = await predictCollection.get();

    const histories = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        histories.push({
            id: doc.id,
            history: {
                result: data.result,
                suggestion: data.suggestion,
                createdAt: data.createdAt,
                id: data.id
            }
        });
    });

    const response = h.response({
        status: 'success',
        data: histories
    });
    response.code(200);
    return response;
}
module.exports = { postPredictHandler, getHistory };