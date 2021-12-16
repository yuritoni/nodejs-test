const User = require('../../../models/user')

/* 
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an admin
 

    User.find({}, '-password').exec()
    .then((users)=> {
            res.status(200).send(users);
     }).catch(
        (err) => { res.status(404).json({message: err.message})}
    );
        
    

}


/*
    POST /api/user/assign-admin/:username
*/
exports.assignAdmin = (req, res) => {
    // refuse if not an admin
   

    User.findOneByREmail(req.params.email)
    .then(
        user => {
            if(!user) throw new Error('user not found')
            user.assignAdmin()
        }
    ).then(
        res.json({
            success: true
        })
    ).catch(
        (err) => { res.status(404).json({message: err.message})}
    )
}