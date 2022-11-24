class MensajeDTO {

    constructor(data){
        this.id = data.id; 
        this.author = data.author; 
        this.text = data.text;
        this.date = data.date; 
    }
}

module.exports = MensajeDTO;