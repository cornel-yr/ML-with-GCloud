const tf = require('@tensorflow/tfjs-node');

async function predictCancer(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()

            const prediction = model.predict(tensor);
            const score = prediction.dataSync()[0]; // ambil isi array

            let result, suggestion; 
            if(score>0.5) {
                result='Cancer';
                suggestion='Segera periksa ke dokter!';
            } else {
                result='Non-cancer';
                suggestion='Penyakit kanker tidak terdeteksi.';
            }
            return { result, suggestion };
    }
    catch (error) {
        throw new Error('Terjadi kesalahan dalam melakukan prediksi');
    }       
}

module.exports = predictCancer;