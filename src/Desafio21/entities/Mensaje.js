class Mensaje {
    
    #id
    #author
    #text
    #date

    constructor(data){
        this.#id = data.id;
        this.#author = data.author; 
        this.#text = data.text;
        this.#date = data.date; 
    }

    get id() { return this.#id }

    set id(id) {
        this.#id = id;
    }

    get author() { return this.#author }

    set author(author) {
        this.#author = author;
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