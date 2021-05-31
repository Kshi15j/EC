const mongoose = require('mongoose')

const techSecretarySchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase:true,
        unique: true,
        trim:true,
        required: true
    },
    ID: {
        type: String,
        unique: true,
        required: false,
        trim: true
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})


techSecretarySchema.statics.addVote = async (name) => {
    const techSecretary = await TechSecretary.findOne({name: name})
    
    if (!techSecretary) {
        throw new Error("Wrong Username or Password.")
    }
    
    techSecretary.votes += 1
    await techSecretary.save()
}


const TechSecretary = mongoose.model('TechSecretary', techSecretarySchema)
module.exports = TechSecretary