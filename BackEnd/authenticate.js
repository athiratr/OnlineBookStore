function authenticate(req, res, next) {

    if (!req.session.username) {
        console.log("SESSION:", req.session);
        console.log("USERNAME:", req.session.username);
        console.log("CATEGORY:", req.session.category);
        return res.status(401).send("Please Login First");
    }

    next();
}

module.exports = authenticate;