module.exports = async (req, res) => {
    try {

        res.json('OFF')
    } catch (e) {
        console.error(e);
    }
}
