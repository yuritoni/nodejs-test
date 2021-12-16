

exports.validateEmail = (req, res, next) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                if (!req.body.email)
                    res.status(403).json({
                        success: false,
                        message: "email terlalu panjang"
                    })
            
                if(req.body.email.length>254)
                    res.status(403).json({
                        success: false,
                        message: "email terlalu panjang"
                    })
            
                var valid = emailRegex.test(req.body.email);
                if(!valid)
                    res.status(403).json({
                        success: false,
                        message: "email tidak valid"
                    })
            
                // Further checking of some things regex can't handle
                var parts = req.body.email.split("@");
                if(parts[0].length>64)
                    res.status(403).json({
                        success: false,
                        message: "format bukan email"
                    })
            
                var domainParts = parts[1].split(".");
                if(domainParts.some(function(part) { return part.length>63; }))
                    res.status(403).json({
                        success: false,
                        message: "email terlalu panjang"
                    })
            
                next();

}

//module.exports = authMiddleware