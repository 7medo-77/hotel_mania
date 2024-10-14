const Joi = require('joi');

class validatorClass {

  static userSchema = Joi.object({
    firstname: Joi.string()
              .min(3)
              .max(50)
              .required(),
    lastName: Joi.string()
              .min(3)
              .max(50),
    email: Joi.string()
            .email()
            .required(),
    password: Joi.string()
              .min(8)
              .max(50)
              .pattern(new RegExp('^[a-zA-Z0-9]{8,50}$'))
              .pattern(new RegExp('(?=.*[A-Z])'))
              .pattern(new RegExp('(?=.*[0-9])'))
              .required()
  });

  static async validateUser(req, res, next) {
    const {error} = this.userSchema.validate(req.body)
    if (error) {
      res.send(error.details[0].message)
    }
    next()
  }

}

module.exports = validatorClass;
