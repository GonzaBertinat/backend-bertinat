class CarritoDTO {

    constructor(data){
        this.id = data.id;
        this.timestamp = data.timestamp; 
        this.products = data.products; 
        this.email = data.email;
        this.deliveryAddress = data.deliveryAddress;
    }
}

module.exports = CarritoDTO;