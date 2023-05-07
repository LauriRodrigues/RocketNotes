import bcrypt from "bcryptjs"
import { AppError } from "../utils/AppError.js"

export class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({name, email, password}) {
    const checkUserExists = await this.userRepository.findByEmail(email)

    if(checkUserExists) {
      throw new AppError("Este e-mail já está em uso.")
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const userCreated = await this.userRepository.create({name, email, password: hashedPassword}) 

    return userCreated
  }
}