class UsuarioDTO {
    
    constructor(data){
        this.id = data.id;
        this.email = data.email;
        this.password = data.password; 
        this.name = data.name; 
        this.address = data.address; 
        this.age = data.age;
        this.phone = data.phone; 
        this.avatar = data.avatar; 
        this.cartId = data.cartId;
    }
}

module.exports = UsuarioDTO;