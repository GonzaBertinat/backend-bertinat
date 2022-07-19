class Usuario {

    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }
    
    addBook(nombre, autor) {
        this.libros.push({
            nombre,
            autor
        });
    }

    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }
}

// Creación del objeto usuario
const usuario = new Usuario('Gonzalo', 'Bertinat', [{nombre: 'Rayuela', autor: 'Julio Cortázar'}], ['Brenda']);

// Invocación de métodos
console.log('Nombre completo:', usuario.getFullName());
usuario.addMascota('Piluso');
console.log('Cantidad de mascotas:', usuario.countMascotas());
usuario.addBook('El principito','Antoine de Saint-Exupéry');
console.log('Libros:', usuario.getBookNames());