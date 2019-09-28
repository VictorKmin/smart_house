module.exports = async (req, res) => {
    try {

        res.json('ON')
    } catch (e) {
        console.error(e);
    }
}
