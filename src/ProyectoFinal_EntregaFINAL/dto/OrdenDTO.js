class OrdenDTO {

    constructor(data){
        this.id = data.id;
        this.items = data.items;
        this.orderNumber = data.orderNumber;
        this.timestamp = data.timestamp;
        this.state = data.state;
        this.email = data.email;
    }
}

module.exports = OrdenDTO;