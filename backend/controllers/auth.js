import bcrypt from "bcryptjs";
import { sql } from "../config/db.js";
import { generateToken } from "../config/auth.js";

export const signup = async (req, res) => {
    try {
        const { fullname, image_url, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields must are required"
            });
        }

        const exist = await sql`
          SELECT id,fullname,email,image_url,owner FROM users where email = ${email}
        `;
        if (exist.length > 0) {
            return res.status(401).json({
                success: false,
                message: "Email already exist on the database…"
            });
        }
        if (password.length < 6) {
            return res.status(401).json({
                success: false,
                message: "Password must be at least six characters long"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await sql`
          INSERT INTO users (fullname, email, image_url,password) VALUES (${fullname},${email},${image_url || ""},${hashedPassword})
          RETURNING id,fullname,email,image_url
        `;
        res.status(201).json({ success: true, data: user });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error in signing up: " + e
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(401).json({
                success: false,
                message: "All fields must are required"
            });
        }
        const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
        if (user.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "User does not exist" });
        }
        const checkPass = await bcrypt.compare(password, user[0].password);
        if (!checkPass) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or password"
            });
        }
        const token = generateToken(user[0], res);

        res.status(200).json({ success: true, date: user[0] });
    } catch (e) {
        return res
            .status(401)
            .json({ success: false, message: "Error in login user: " + e });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.user;
        const { fullname, email, password, image_url, owner } = req.body;

        const existUser = await sql`
      SELECT id FROM users WHERE id=${id}
    `;
        if (existUser.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        let hashedPassword;
        if (password) {
            const gen = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, gen);
        }

        const user = await sql`
      UPDATE users SET 
        fullname = COALESCE(${fullname},fullname),
        email = COALESCE(${email},email),
        image_url = COALESCE(${image_url},image_url),
        password = COALESCE(${hashedPassword},password),
        owner = COALESCE(${owner || false},owner)
        
        WHERE id = ${id}
        RETURNING id,fullname,email,image_url,owner
    `;
        res.status(200).json({ success: true, data: user[0] });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error updating user: " + e
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const user = await sql`
      SELECT id,fullname,email,image_url,owner FROM users
    `;
        res.status(200).json({ success: true, data: user });
    } catch (e) {
        res.status(401).json({
            success: false,
            message: "Error getting users" + e
        });
    }
};

export const getUser = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await sql`
          SELECT id,fullname,email,image_url,owner FROM users WHERE id = ${id}
        `
        if (user.length === 0) {
          return res.status(404).json({success: false,message: "User not found!"})
        }
        res.status(200).json({success: true, data: user[0]})
    } catch (e) {
       res.status(500).json({success: false,message: "Error getting user: "+e})
    }
};

export const deleteUser = async (req,res)=>{
  try {
    const {id} = req.params
    const user = await sql`
      SELECT id,fullname,email,image_url FROM users WHERE id = ${id}
    `
    if (user.length === 0) {
      return res.status(404).json({message: "User not found!"})
    }
    
    const deletedUser = await sql`
      DELETE FROM users WHERE id = ${id}
      RETURNING id,fullname,email,password
    `
    rrs.status(200).json({success: true,data: deletedUser[0]})
  } catch (e) {
    res.status(500).json({success: false,message: "Error in Deleting users"+e})
  }
}