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

    async editProfile(newValues) {
        const {
            id,
            firstName,
            lastName,
            profilePicture,
            password
        } = newValues;
        const user = await User.findByPk(id);
        if (!user) {
            return {
                succes: false,
                error: "User not found"
            };
        }
        await user.update({
            firstName,
            lastName,
            profilePicture,
            password
        });
        return {
            succes: true,
            user
        }
    }
}

export default UserService;
