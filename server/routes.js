const common = require("../../lib/common.js");
const path = require("path");
const routes = {};
const payment = {
  general: require("./payment/general.js")
};
const users = {
  create: require("./users/create.js"),
  authentication: require("./users/authentication"),
  db: require("./users/db_functions.js")
};

const galleries = {
  db: require("./galleries/db_functions.js"),
  general: require("./galleries/general.js")
};

const misc = {
  contact: require("./misc/contact.js")
};

routes.general = {
  contact: function(req, res) {
    res.locals.uploadDir = path.resolve(
      __basedir + "/renandrain/static/files/"
    );
    common
      .parseForm(req, res)
      .then(fields => {
        console.log(fields);
        return misc.contact.sendEmail(fields);
      })
      .then(() => {
        res.send("Done");
      })
      .catch(err => {
        console.log(err);
        if (/maxfilesize/i.test(err.message))
          res.status(413).send("Maximum file size exceeded.");
        else res.status(500).end();
      });
  }
};

routes.galleries = {
  optimise: async function(req, res, next) {
    const status = await galleries.general.optimise(req.params.id);
    res.send(status);
  },
  getGallery: async function(req, res) {
    console.log("Running getGallery...");
    const category = req.params.category;
    const id = req.params.id;

    const { galleryImages, galleryInfo } = await galleries.db.getGallery({
      category,
      id
    });
    res.status(200).json({ galleryImages, galleryInfo });
  }
};

routes.payment = {
  getStripePublicKey: function(req, res) {
    const key = payment.general.getStripePublicKey();
    if (!key)
      res
        .status(404)
        .send({
          event: "retrieve_stripe_key_failed",
          message: "There was an error retrieving the Stripe key."
        });
    else
      res
        .status(200)
        .json({
          event: "retrieve_stripe_key_succeeded",
          body: { publicStripeKey: key }
        });
  }
};

routes.user = {
  isAuth: function(roles) {
    // @param: roles – Array of roles allowed to access chained resource
    // 1. Parses accessToken from Authorization Bearer header
    // 2. Verifies and decodes the accessToken
    // 3. If token expired, renew it using refreshToken
    // 3b. If refreshToken is expired, end the session
    // 4. Check role
    // 5. If passes, pass to next Middleware
    return async function(req, res, next) {
      console.log("Running isAuth...");
      let bearer, accessToken;
      const failedAuthorisation = () => {
        res.clearCookie("refreshToken");
        res
          .status(403)
          .json({
            event: "not_authorised",
            message: "You are not authorised to access this resource."
          });
      };

      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      )
        bearer = req.headers.authorization.split(" ")[1];
      else return failedAuthorisation();

      let decodedAccessToken = await users.authentication.verifyToken(bearer);

      if (decodedAccessToken === "expired")
        ({
          decodedAccessToken,
          accessToken
        } = await users.authentication.getNewAccessToken(
          req.signedCookies.refreshToken
        ));
      if (accessToken) res.locals.accessToken = accessToken;
      if (decodedAccessToken)
        res.locals.decodedAccessToken = decodedAccessToken;

      if (typeof decodedAccessToken === "object" && decodedAccessToken.id) {
        const role = decodedAccessToken.role;
        const accessPermitted = users.authentication.checkRole(roles, role);
        if (accessPermitted) next();
        else return failedAuthorisation();
      } else return failedAuthorisation();
    };
  },
  create: async function(req, res) {
    const fields = await common.parseForm(req, res);
    const emailValid = users.create.validateEmail(fields.email);
    if (!emailValid)
      return res
        .status(401)
        .json({
          event: "account_creation_failed",
          message: "The email address you entered is not valid."
        });
    const existingUser = await users.db.getDataByEmail(fields.email);
    if (existingUser)
      return res
        .status(401)
        .json({
          event: "account_creation_failed",
          message: "The email address you entered is already registered."
        });

    const email_verification_code = await users.authentication.emailVerificationCode(
      fields.email
    );
    const passwordValid = users.create.validatePassword(fields.password);
    if (!passwordValid)
      return res
        .status(401)
        .json({
          event: "account_creation_failed",
          message:
            "The password you entered is not valid. Passwords must be at least 8 characters and container a minimum of one uppercase letter and one number."
        });
    const passwordMatch = users.create.validatePasswordMatch({
      password1: fields.password,
      password2: fields.password_confirm
    });
    if (!passwordMatch)
      return res
        .status(401)
        .json({
          event: "account_creation_failed",
          message: "The passwords you entered did not match."
        });
    const passwordHash = await users.authentication.createPasswordHash(
      fields.password
    );
    fields.password = passwordHash;
    const userid = await users.db.insertNewUser({
      email_verification_code,
      ...fields
    });

    const sendVerificationEmail = users.authentication.sendVerificationEmail({
      first_name: fields.first_name,
      email_verification_code,
      email: fields.email
    });

    const refresh = users.authentication.generateRefresh(userid);

    const startSession = users.db.newSession({
      userid,
      ip: res.locals.requestData.ip,
      token: refresh
    });

    const jwt = users.authentication.generateToken({
      id: userid,
      role: "user",
      email_verified: false,
      first_name: fields.first_name,
      last_name: fields.last_name,
      email: fields.email
    });

    Promise.all([sendVerificationEmail, startSession])
      .then(() => {
        res.cookie("refreshToken", refresh, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          signed: true
        });
        res
          .status(200)
          .json({
            event: "account_creation_succeeded",
            message: "Your new account has been created.",
            token: jwt
          });
      })
      .catch(console.log);
  },
  verify: async function(req, res) {
    const { email, email_verification_code } = await common.parseForm(req, res);
    const user = await users.db.getDataByEmail(email);
    if (!user || !user.id)
      return res
        .status(401)
        .json({
          event: "email_verification_failed",
          message: "This email address could not be verified."
        });

    const codeValid = user.email_verification_code === email_verification_code;
    if (!codeValid)
      return res
        .status(401)
        .json({
          event: "email_verification_failed",
          message: "The verification code that you submitted did not match."
        });
    if (user.email_verified)
      return res
        .status(200)
        .json({
          event: "email_already_verified",
          message: "This email address has already been verified.",
          accessToken: res.locals.accessToken
        });

    users.db
      .verifyEmail(user.id)
      .then(() => {
        res
          .status(200)
          .json({
            event: "email_verified",
            message: "Email address successfully verified."
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            event: "email_verification_error",
            message:
              "There was an error verifying your email. Please try again later."
          });
      });
  },
  init: async function(req, res) {
    if (res.locals.decodedAccessToken && res.locals.accessToken) {
      res
        .status(200)
        .json({
          event: "init_succeeded",
          message: "User is logged in.",
          accessToken: res.locals.accessToken
        });
    } else
      res
        .status(200)
        .json({ event: "init_succeeded", message: "User is not logged in." });
  },
  login: async function(req, res) {
    console.log("Running login...");
    const fields = await common.parseForm(req, res);
    try {
      const userData = await users.authentication.checkPassword({
        email: fields.email,
        password: fields.password
      });
      if (!userData) throw new Error();

      const refresh = users.authentication.generateRefresh(userData.id);
      const startSession = await users.db.newSession({
        userid: userData.id,
        ip: res.locals.requestData.ip,
        token: refresh
      });
      const jwt = users.authentication.generateToken({
        id: userData.id,
        role: userData.role,
        email_verified: userData.email_verified,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email
      });

      res.cookie("refreshToken", refresh, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        signed: true
      });
      res
        .status(200)
        .json({
          event: "login_succeeded",
          message: "You are now logged in.",
          token: jwt
        });
    } catch (err) {
      return res
        .status(401)
        .json({
          event: "login_failed",
          message: "Login details were incorrect"
        });
    }
  },
  logout: function(req, res) {
    console.log("Running logout...");
    const refreshToken = req.signedCookies.refreshToken;
    console.log(refreshToken);
    users.db.endSession(refreshToken).then(() => {
      res.clearCookie("refreshToken");
      res
        .status(200)
        .json({
          event: "logged_out",
          message: "You have been successfully logged out."
        });
    });
  }
};

module.exports = routes;
