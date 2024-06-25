import PostService from "../services/PostService.js";

const postService = new PostService();

export const post = async (req, res) => {
    try {
        const result = await postService.post(req.body);
        const status = result.success ? 200 : 404;
        res.status(status).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to save post"
        });
    }
}

export const fetchHomeFeed = async (req, res) => {
    try {
        const result = await postService.fetchHomeFeed();
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to fetch home feed"
        });
    }
}

export const fetchProfileFeed = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await postService.fetchProfileFeed(userId);
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to fetch profile feed"
        });
    }
}
