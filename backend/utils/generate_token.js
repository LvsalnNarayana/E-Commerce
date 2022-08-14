import Jwt from 'jsonwebtoken';

const generate_token = (id) => {
    return Jwt.sign({ id: id }, process.env.JWT_SECRET);
}

export default generate_token