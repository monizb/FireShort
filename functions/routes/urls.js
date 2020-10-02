let express = require('express');
let router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

function validate_api_key(api_key) {
    return new Promise(async (resolve, reject) => {

        let snapshot = await db.collection("apikeys")
            .where("key", "==", api_key)
            .get();
        if (snapshot.empty)
            return reject('invalid api key')
        snapshot.forEach(doc => {
            return resolve(doc.data())
        })
    })
}

router.get('/url', async function (req, res, next) {
    try {
        let api_key = req.headers.api_key;
        if (!api_key)
            return res.status(404).send('no api key specified')
        let userData = await validate_api_key(api_key);
        let urlRef = db.collection('shorturls');
        let shorturls = [];
        let snapshot = await urlRef.get();
        snapshot.forEach(doc => {
            shorturls.push(doc.data())
        });
        return res.send(shorturls)
    } catch (e) {
        return res.status(404).send(e.toString())
    }
});
router.get('/url/:name', async function (req, res, next) {
    try {
        let name = req.params.name;
        let api_key = req.headers.api_key;
        if (!api_key)
            return res.status(404).send('no api key specified')
        let userData = await validate_api_key(api_key);
        let urlRef = db.collection('shorturls').doc(name);
        let doc = await urlRef.get();
        if (!doc.exists)
            return res.status(404).send('invalid name')
        let urlData = doc.data();
        return res.send(urlData)
    } catch (e) {
        return res.status(404).send(e.toString())
    }
});
router.get('/url/:name/track', async function (req, res, next) {
    try {
        let name = req.params.name;
        let api_key = req.headers.api_key;
        if (!api_key)
            return res.status(404).send('no api key specified')
        let userData = await validate_api_key(api_key);
        let urlRef = db.collection('shorturls').doc(name).collection('tracking');
        let trackingData = [];
        let snapshot = await urlRef.get();
        snapshot.forEach(doc => {
            trackingData.push(doc.data())
        });
        return res.send(trackingData)
    } catch (e) {
        return res.status(404).send(e.toString())
    }
});
router.post('/url', async function (req, res, next) {
    try {
        let name = req.body.name;
        let lurl = req.body.lurl;
        let track = req.body.track;
        let api_key = req.headers.api_key;
        if (!api_key)
            return res.status(404).send('no api key specified')
        let userData = await validate_api_key(api_key);
        let urlRef = db.collection('shorturls').doc(name);
        let result = await urlRef.set({name: name, hits: 0, lurl: lurl, track: track});
        return res.send("Success")
    } catch (e) {
        return res.status(404).send(e.toString())
    }
});
router.post('/url/:name', async function (req, res, next) {
    try {
        let name = req.params.name;
        let lurl = req.body.url;
        let track = req.body.track;
        let api_key = req.headers.api_key;
        if (!api_key)
            return res.status(404).send('no api key specified')
        let userData = await validate_api_key(api_key);
        let urlRef = db.collection('shorturls').doc(name);
        let result = await urlRef.update({name: name, lurl: lurl, track: track});
        return res.send("Success")
    } catch (e) {
        return res.status(404).send(e.toString())
    }
});
router.delete('/url/:name', async function (req, res, next) {
    try {
        let name = req.params.name;
        let api_key = req.headers.api_key;
        if (!api_key)
            return res.status(404).send('no api key specified')
        let userData = await validate_api_key(api_key);
        let urlRef = db.collection('shorturls').doc(name);
        let result = await urlRef.delete();
        return res.send("Success")
    } catch (e) {
        return res.status(404).send("Unable to delete url")
    }
});

module.exports = router;
