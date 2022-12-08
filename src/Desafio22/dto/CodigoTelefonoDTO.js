class CodigoTelefonoDTO {

    constructor(data){
        this.id = data.id;
        this.country = data.country;
        this.phone_code = data.phone_code;
    }
}

module.exports = CodigoTelefonoDTO;