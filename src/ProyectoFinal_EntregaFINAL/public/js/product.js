let cantidadSeleccionada = 0;

const removeUnit = () => {
    const cantidadSpan = document.querySelector('.cantidad-unidades');
    if(cantidadSeleccionada > 0){
        cantidadSeleccionada--;
        cantidadSpan.innerHTML = cantidadSeleccionada;
    }
}

const addUnit = () => {
    const cantidadSpan = document.querySelector('.cantidad-unidades');
    const stockSpan = document.querySelector('#stock-producto');
    const stock = parseInt(stockSpan.innerHTML);
    if(cantidadSeleccionada < stock){
        cantidadSeleccionada++;
        cantidadSpan.innerHTML = cantidadSeleccionada;
    }
}

const addToCart = () => {
    if(cantidadSeleccionada === 0){
        alert('Error! Debe agregar al menos una unidad del producto al carrito.');
    } else {
        const cartIdInput = document.querySelector('#cartId');
        const productIdInput = document.querySelector('#productId');
        const cartId = cartIdInput.value;
        const productId = productIdInput.value;
        
        fetch(`/api/carrito/${cartId}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: productId,
                units: cantidadSeleccionada
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
}