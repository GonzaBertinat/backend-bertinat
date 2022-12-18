const removeFromCart = (productId, cartId) => {

    fetch(`/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                mutation {
                    deleteProductFromCart(cartId: "${cartId}", productId: "${productId}") {
                        id
                    }
                }
            `
        })
    })
    .then(res => {
        if(res.status != 200){
            throw Error('Error al invocar servicio');
        }
        return res.json();
    })
    .then(response => {
        if(response.data?.deleteProductFromCart?.id){
            alert('Producto eliminado del carrito con éxito.');
            location.reload();
        } else {
            alert('No se pudo eliminar el producto del carrito, inténtelo más tarde.')
        }
    }) 
    .catch(error => alert('No se pudo eliminar el producto del carrito, inténtelo más tarde.'));
}

const cleanCart = (cartId) => {

    fetch(`/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                mutation {
                    deleteCart(id: "${cartId}")
                }
            `
        })
    })
    .then(res => {
        if(res.status != 200){
            throw Error('Error al invocar servicio');
        }
        return res.json();
    })
    .then(response => {
        if(response.data?.deleteCart){
            location.reload();
        } else {
            alert('Error al limpiar el carrito, inténtelo más tarde.');
        }
    }) 
    .catch(error => alert('Error al limpiar el carrito, inténtelo más tarde.'));
}