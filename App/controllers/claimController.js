const db = require("./../models");

const SubmitClaim = {}
const UserClaims = {}
const AllClaims = {}
const VerifyClaim = {}
const ApproveClaim = {}


SubmitClaim.post = (req,res) => {
    console.log('INCOMING CLAIM:',req.body)
    const {
        user,
        date,
        details,
        cost
    } = req.body

    let newClaim = db.ClaimSchema({
        user,
        date,
        details,
        cost
    })
    .save()
    .then((newClaim)=>{
        res.status(200).json({
            success:true,
            doc:newClaim            
        })
    })
}

UserClaims.get = (req,res) =>{
    console.log('PARAMS',req.params)
    db.ClaimSchema.find({
        user:req.params.id
    }).then((doc)=>{
        console.log(doc)
        res.status(200).json({
            success:true,
            doc
        })
    })
}

AllClaims.get = (req,res) =>{
    db.ClaimSchema
    .find({})
    .then((doc)=>{
        res.status(200).json({
            success:true,
            doc
        })
    })
}

VerifyClaim.post = (req,res) => {

}

ApproveClaim.post = (req,res) => {
    console.log('APRROVE INCOMING:',req.body)
    db.ClaimSchema.findByIdAndUpdate({
        _id:req.body.claimId
    },{
        approved:true
    }).then(()=>{
        db.ClaimSchema.findOne({
            _id:req.body.claimId
        },(err,docs)=>{
            if (err) throw Error;
            if(docs){
                res.status(200).json({
                    success:true,
                    docs:docs
                })
            } else if(!docs){
                res.status(200).json({
                    success:false
                })
            }
        })
    })
}

module.exports = {
    SubmitClaim,
    UserClaims,
    AllClaims,
    VerifyClaim,
    ApproveClaim
}