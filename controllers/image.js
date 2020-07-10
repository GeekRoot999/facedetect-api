const clarifai = require('clarifai');

// api key will be provided when you create an account in clarifai
const app = new Clarifai.App({
    apiKey: 'c7f0aaf3f26f449e95738fba71fa6dc2'
});

const handleApiCall = (req, res) =>{
app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage =  (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage, handleApiCall
}