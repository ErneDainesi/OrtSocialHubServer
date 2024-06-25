import { User } from "../model/models.js";

class UserService {
    async fetchUsersProfile(req) {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName', 'profilePicture']
        });
        if (!user) {
            return {
                success: false,
                error: "User not found"
            };
        }
        return {
            success: true,
            user
        };
    }
}

export default UserService;
