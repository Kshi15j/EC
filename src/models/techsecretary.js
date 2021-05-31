const mongoose = require('mongoose')

const techsecretarySchema = new mongoose.Schema({
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


techsecretarySchema.statics.addVote = async (name) => {
    const techsecretary = await techSecretary.findOne({name: name})
    
    if (!techsecretary) {
        throw new Error("Wrong Username or Password.")
    }
    
    techsecretary.votes += 1
    await techsecretary.save()
}


const techSecretary = mongoose.model('techSecretary', techsecretarySchema)
module.exports = techSecretary