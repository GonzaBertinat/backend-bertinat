class MensajeDTO {

    constructor(data){
        this.id = data.id;
        this.email = data.email;
        this.type = data.type;
        this.text = data.text;
        this.date = data.date;
    }
}

module.exports = MensajeDTO;