import { User } from "../model/models.js";

class UserService {
    async fetchUsersProfile(req) {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName', 'profilePicture', 'email']
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
            profilePicture
        } = newValues;
        const user = await User.findByPk(id);
        if (!user) {
            return {
                succes: false,
                error: "User not found"
            };
        }
        if (user.profilePicture !== profilePicture) {
            await user.update({
                firstName,
                lastName,
                profilePicture
            });
        } else {
            await user.update({
                firstName,
                lastName,
            });
        }
        return {
            succes: true,
            user
        }
    }
}

export default UserService;
