import { Post } from "../model/models.js";

export const post = async (req, res) => {
    try {
        await Post.create(req.body);
        res.status(200).json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to save post"
        });
    }
}
