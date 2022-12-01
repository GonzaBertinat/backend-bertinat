class CarritoDTO {

    constructor(data){
        this.id = data.id;
        this.timestamp = data.timestamp; 
        this.products = data.products; 
    }
}

module.exports = CarritoDTO;