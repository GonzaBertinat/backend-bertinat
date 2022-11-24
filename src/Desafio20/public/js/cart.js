const removeFromCart = (productId, cartId) => {
    fetch(`/api/carrito/${cartId}/productos/${productId}`, {
        method: 'DELETE'
    })
    .then(res => { 
        if(res.status != 200){
            throw Error('Error al invocar servicio');
        }
        return res.json();
     })
    .then(response => {
        alert('Producto eliminado del carrito con éxito.');
        location.reload();
    }) 
    .catch(error => alert('No se pudo eliminar el producto del carrito, inténtelo más tarde.'));
}

const cleanCart = (cartId) => {
    fetch(`/api/carrito/${cartId}`, {
        method: 'DELETE'
    })
    .then(res => { 
        if(res.status != 200){
            throw Error('Error al invocar servicio');
        }
        return res.json();
     })
    .then(response => {
        location.reload();
    }) 
    .catch(error => alert('Error al limpiar el carrito, inténtelo más tarde.'));
}