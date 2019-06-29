const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello world!");
 });

 //code for geting documents
 exports.setScreams = functions.https.onRequest(( req, res) => {
     admin.firestore().collection('screams')
     .get()
     .then((data) => {
         let screams = [];                  // we need to store them in something
         data.forEach((doc) => {
             screams.push(doc.data());      // for each document - doc is a reference, data is the funct the returns the data inside the document
         });
         return res.json(screams);          //returning the data in the newly initialized array
     })
     .catch((err) => console.error(err));
 });

 //code for creating documents
 exports.createScreams = functions.https.onRequest((req, res) => {
    const newScream = {                 //initializing new scream
        body: req.body.body,
        userHandle: req.body.uesrHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())           //body = body of request, 2body = properties of body
    };

    admin
        .firestore()
        .collection('screams')
        .add(newScream)  
        .then((doc) => {
            res.json({ message: `document ${doc.id} created sucessfully` });
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong'});
            console.err(err);
        });                           
 });

 /Users/test/Desktop/resumeProjects2/social-ape-functions/functions/index.js