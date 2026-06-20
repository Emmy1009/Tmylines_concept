import jwt from "jsonwebtoken";

import "dotenv/config";

export const generateToken = (user, res) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            owner: user.owner
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return token;
};

export const verifyToken = (req, res, next) => {
    const authHeader =
        req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorised!" });
    }

    const token = authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("EError in verify jwt", err);
        return res.status(403).json({ message: "Invalid token" });
    }
};

export const owner = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user.owner) {
            return res.status(401).json({ message: "Not Unauthorised" });
        }
        next();
    } catch (e) {
      console.log("EError in Owner jwt", err);
        return res.status(403).json({ message: "Invalid token" });
    }
};
