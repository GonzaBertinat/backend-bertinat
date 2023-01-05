const removeFromCart = (productId, cartId) => {

    fetch(`/api/carrito/${cartId}/productos/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(res => {
        if(res.status != 200){
            throw Error('Error al invocar servicio');
        }
        return res.json();
    })
    .then(response => {
        if(response.ok){
            alert('Producto eliminado del carrito con éxito.');
            location.reload();
        } else {
            alert('No se pudo eliminar el producto del carrito, inténtelo más tarde.')
        }
    }) 
    .catch(error => alert('No se pudo eliminar el producto del carrito, inténtelo más tarde.'));
}

const cleanCart = (cartId) => {

    fetch(`/api/carrito/${cartId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(res => {
        if(res.status != 200){
            throw Error('Error al invocar servicio');
        }
        return res.json();
    })
    .then(response => {
        if(response.ok){
            location.reload();
        } else {
            alert('Error al limpiar el carrito, inténtelo más tarde.');
        }
    }) 
    .catch(error => alert('Error al limpiar el carrito, inténtelo más tarde.'));
}