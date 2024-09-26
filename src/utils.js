const requireLogin = (req, res , next) => {
    if(req.session.userId){
        return next();
    }
    res.redirect('/login'  )
}

function parseFirstName(fullName){
  let nameParts = fullName.split(" ");
  return nameParts[0];
}

module.exports = {requireLogin, parseFirstName};