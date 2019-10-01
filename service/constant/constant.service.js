const db = require('../../dataBase').getInstance();

module.exports = {
    getConstantByLabel: async label => {
        const ConstantsModel = db.getModel("Constant");
        console.log(ConstantsModel);
        const constant = await ConstantsModel.findOne({
            where: {
                label
            }
        });

        return constant && constant.dataValues
    },

    chanheConstantValue: async (label, newValue) => {
        const ConstantsModel = db.getModel("Constant");
        await ConstantsModel.update(
            {
                value: newValue
            },
            {
                where: {
                    label
                }
            })
    }
}
