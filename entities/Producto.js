class Producto {

    #id;
    #title;
    #description;
    #price;
    #thumbnail;
    #code;
    #stock;
    #timestamp;
    #units;
    #category;

    constructor(data){
        this.#id = data.id;
        this.#title = data.title;
        this.#description = data.description;
        this.#price = data.price;
        this.#thumbnail = data.thumbnail;
        this.#code = data.code;
        this.#stock = data.stock;
        this.#timestamp = data.timestamp;
        this.#units = data.units;
        this.#category = data.category;
    }

    get id() { return this.#id }

    set id(id) {
        this.#id = id;
    }

    get title() { return this.#title }

    set title(title) {
        this.#title = title;
    }

    get description() { return this.#description }

    set description(description) {
        this.#description = description;
    }

    get price() { return this.#price }

    set price(price) {
        this.#price = price;
    }

    get thumbnail() { return this.#thumbnail }

    set thumbnail(thumbnail) {
        this.#thumbnail = thumbnail;
    }
    
    get code() { return this.#code }

    set code(code) {
        this.#code = code;
    }
    
    get stock() { return this.#stock }

    set stock(stock) {
        this.#stock = stock;
    }

    get timestamp() { return this.#timestamp }

    set timestamp(timestamp) {
        this.#timestamp = timestamp;
    }

    get units() { return this.#units }

    set units(units) {
        this.#units = units;
    }

    get category() { return this.#category }

    set category(category){
        this.#category = category;
    }
}

module.exports = Producto;