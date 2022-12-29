const addToCart = productId => {
    const cartIdInput = document.querySelector('#cartId');
    const cartId = cartIdInput.value;

    fetch(`/api/carrito/${cartId}/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: productId,
            units: 1
        })
    })
    .then(res => {
        if(res.status != 200){
            throw Error('Error al invocar servicio');
        }
        return res.json();
    })
    .then(response => {
        if(response.id){
            alert('Producto agregado al carrito con éxito.');
        } else {
            alert('No se pudo agregar el producto al carrito, inténtelo más tarde.');
        }
    }) 
    .catch(error => alert('No se pudo agregar el producto al carrito, inténtelo más tarde.'));
}