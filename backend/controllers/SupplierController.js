const Supplier = require('../models/Supplier');


module.exports = {

    async createSupplier(req, res) {
        const {
            CompanyName, 
            CompanyPhone, 
            CompanyEmail, 
            CompanyContactPerson, 
            CompanyAddress
        } = req.body;

        const {filename} = req.file;

        try {
            const checksupplier = await Supplier.findOne({CompanyEmail});
            if(checksupplier){
                return res.status(400).json({message: 'Supplier already exist.'})
            }

            const supplier = await Supplier.create({
                CompanyName, 
                CompanyPhone, 
                CompanyEmail, 
                CompanyContactPerson, 
                CompanyAddress,
                CompanyThumbnail: filename
            })

            return res.status(200).json({message: 'Supplier created successfully'})

        }catch(error) {
            throw Error(`Supplier creation error ${error}`)
        }
    },

    async getSupplierById(req, res) {
        const {supplierId} = req.params;
        try{
            const supplier = await Supplier.findById(supplierId);
            if(supplier){
                return res.json(supplier);
            }
            return res.status(400).json({message: 'No supplier found'})
        }catch(error){
            throw Error(`Supplier error ${error}`)
        }
    },

    async getAllSuppliers(req, res) {
        try{
            const suppliers = await Supplier.find();
            if(suppliers){
                return res.json(suppliers);
            }
            return res.status(400).json({message: 'No Supplier found'})

        }catch(error){
            return res.status(400).json({message: error})
        }
    },

    //METHOD FOR DELETING SUPPLIER BY ID
    async deleteSupplierById(req, res){
        const {supplierId} = req.params;
        try{
            await Supplier.findByIdAndDelete(supplierId);
            return res.status(200).json({message:'Deleted'});

        }catch(error){
            throw Error(`Error deleting supplier ${error}`)
        }
    }
}