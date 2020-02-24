const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'cea1f6af6e064d2482d1394d350afb14', 
 });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}
 

const imageHandler = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
           res.json(entries[0])
      })
      .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    imageHandler,
    handleApiCall
}