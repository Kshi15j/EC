const express = require('express')
const path = require('path')
const router = new express.Router()
const TechSecretary = require('../models/techsecretary')


const auth = require('../middleware/voter')

router.use('/', express.static(path.join(__dirname, '..', 'static', 'vote')));

// Information Page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'vote', 'info.html'))
})

router.get('/techsec', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'vote', 'ballot_tech.html'))
})



router.post('/techsec', auth, async (req, res) => {
    try {
        if (req.body.techSecretary) {
            const techSecretary = await TechSecretary.findOne({name: req.body.techSecretary})
            techSecretary.votes += 1
            await techSecretary.save()
        }

        res.status(200).send({
            "text": "Thank You for Voting."
        })
    } catch (e) {
        // console.log(e)
        res.status(400).send({
            "text": "Internal Server Error."
        })
    }
})

module.exports = router