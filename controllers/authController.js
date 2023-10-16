const {user} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require('../helper/mailer')
exports.register = async (req, res) => {
  //console.log(db)
    try {
        console.log(req.body.name)
        var { name, password, email, role_id } = req.body;
        
        const hashedPassword = await hashPassword(password)
        const newuser = await user.create({
                    name,
                    email,
                    password: hashedPassword,
                    role_id
                  });
        
        const token = jwt.sign({ id: newuser.id, name: newuser.name }, 'yourSecretKey', {
          expiresIn: '1h', 
        });
        mailer.sendVerificationEmail(newuser, token)
        res.status(201).json({success: true,  message: 'User registered successfully', data: newuser});
      } catch (error) {
        res.status(500).json({success:true, message: 'Error registering user', error: error.message });
      }
}

exports.login = async (req,res) =>{
    try {
        var { email, password } = req.body;
        console.log({ email, password })
        const userLoggedin = await user.findOne({ where: { email } });
    
        if (!userLoggedin) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, userLoggedin.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        const token = jwt.sign({ id: userLoggedin.id, name: userLoggedin.name }, 'yourSecretKey', {
          expiresIn: '1h', 
        });
    
        res.status(200).json({ message: 'Authentication successful', token: token });
      } catch (error) {
        res.status(500).json({ message: 'Error authenticating user', error: error.message });
      }
}

exports.verify = async(req,res) =>{
  //validate token
  const token = req.query.token;
  const secretKey = 'yourSecretKey';

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded)
    const userId = decoded.id;
    const userLoggedin = await user.update( {is_validate : true},{ where: { id: userId } });
    console.log(userLoggedin);
    if(!userLoggedin){
      res.send([userLoggedin. userId]);

    }
    res.send('Email verified successfully.');

  } catch (err) {
    // Handle token verification failure
    res.send(err);
  }
}

const hashPassword = async (password, saltRounds = 10) => {
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(saltRounds)
  
      // Hash password
      return await bcrypt.hash(password, salt)
    } catch (error) {
      console.log(error)
    }
  
    // Return null if error
    return null
  }
