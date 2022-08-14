import bcrypt from 'bcrypt';

const match_password = async function (entered_password , user_passwrod) {
    return await bcrypt.compare(entered_password, user_passwrod)
}

export default match_password