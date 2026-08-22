import bcrypt from "bcrypt"

const SALT_ROUNDS = 12

function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword)
}

function hashPassword(password) {
  return bcrypt.hashSync(password, SALT_ROUNDS)
}

export {
  hashPassword,
  verifyPassword
}