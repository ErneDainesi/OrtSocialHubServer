export const register = async (req, res) => {
    console.log(req.body);
    res.status(200).json({
        success: true,
        message: 'got post request to register endpoint'
    });
}
