const {Signup} = require('../controllers/userController');
const {OTP} = require('../controllers/userController');
const {Login} = require('../controllers/userController');
const {SingleUser} = require('../controllers/userController');
const {GetUserById} = require('../controllers/userController');

const {SubmitClaim} = require('../controllers/claimController');
const {UserClaims} = require('../controllers/claimController');
const {AllClaims} = require('../controllers/claimController');
const {ApproveClaim} = require('../controllers/claimController');

let appRouter = (app) => {
    app.post('/signup',Signup.post)
    app.post('/otp',OTP.post)
    app.post('/login',Login.post)
    app.post('/submitclaim',SubmitClaim.post)
    app.post('/approveclaim',ApproveClaim.post)
    
    app.get('/getuser/:userName',SingleUser.get)
    app.get('/getclaims/:id',UserClaims.get)
    app.get('/getallclaims',AllClaims.get);
    app.get('/getuserbyid/:id',GetUserById.get);
}

module.exports = appRouter