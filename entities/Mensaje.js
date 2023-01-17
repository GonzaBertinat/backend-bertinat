class Mensaje {
    
    #id
    #email
    #type
    #text
    #date

    constructor(data){
        this.#id = data.id;
        this.#email = data.email;
        this.#type = data.type;
        this.#text = data.text;
        this.#date = data.date;
    }

    get id() { return this.#id }

    set id(id) {
        this.#id = id;
    }

    get email() { return this.#email }

    set email(email) {
        this.#email = email;
    }
    
    get type() { return this.#type }

    set type(type) {
        this.#type = type;
    }
    
    get text() { return this.#text }

    set text(text) {
        this.#text = text;
    }
    
    get date() { return this.#date }

    set date(date) {
        this.#date = date;
    }
}

module.exports = Mensaje;