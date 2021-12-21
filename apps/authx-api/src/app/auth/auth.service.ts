class AuthService {

  static async get ( email: string ) {
    return await AuthModel.findById(email);
  }

  static async create ( email, password ) {
    await
  }

  static async delete ( email, password ) {
    await
  }
}

export default AuthService
