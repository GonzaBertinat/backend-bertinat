class ProductoDTO {
    
    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.price = data.price;
        this.thumbnail = data.thumbnail;
        this.code = data.code;
        this.stock = data.stock;
        this.timestamp = data.timestamp;
        this.units = data.units;
        this.category = data.category;
    }
}

module.exports = ProductoDTO;