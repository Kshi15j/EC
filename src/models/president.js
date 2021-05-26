const mongoose = require('mongoose')

const presidentSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase:true,
        unique: true,
        trim:true,
        required: true
    },
    votes: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true
})


presidentSchema.statics.addVote = async (name) => {
    const president = await President.findOne({name: name})
    
    if (!president) {
        throw new Error("Wrong Username or Password.")
    }
    
    president.votes += 1
    president.save()
}


const President = mongoose.model('President', presidentSchema)
module.exports = President