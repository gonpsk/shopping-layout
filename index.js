let product = [{
    id: 1,
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Nike',
    price: 6000,
    description: 'Nike Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit cum amet repudiandae tenetur ipsa ut repellat officiis impedit explicabo asperiores?',
    type: 'shoe'
}, {
    id: 2,
    img: 'https://images.unsplash.com/photo-1511746315387-c4a76990fdce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Adidas shirt',
    price: 2500,
    description: 'Adidas Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex facilis quia nam consequuntur fuga doloremque natus corrupti? Qui, suscipit adipisci!',
    type: 'shirt'
}, {
    id: 3,
    img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Adidas shoe',
    price: 3500,
    description: 'Adidas shoe Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex facilis quia nam consequuntur fuga doloremque natus corrupti? Qui, suscipit adipisci!',
    type: 'shoe'
}];


$(document).ready(() => {

    let data = '';

    for (let i = 0; i < product.length; i++) {
        data += `<div onclick="openproductdetail(${i})" class="product-items ${product[i].type}">
        <img class="product-img"
            src="${product[i].img}"
            alt="${product[i].name}">
        <p style='font-size: 1.2vw;'>${product[i].name}</p>
        <p style= 'font-size: 1vw;'>${numberWithCommas(product[i].price)} THB</p>
    </div>`;
    }

    $('#productlist').html(data);

})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function searchsomething(elem) {
    let value = $('#' + elem.id).val().toLowerCase();
    console.log(value)

    let data = ''
    for (let i = 0; i < product.length; i++) {
        if (product[i].name.toLowerCase().includes(value)) {
            data += `<div onclick="openproductdetail(${i})" class="product-items ${product[i].type}">
        <img class="product-img"
            src="${product[i].img}"
            alt="${product[i].name}">
        <p style='font-size: 1.2vw;'>${product[i].name}</p>
        <p style= 'font-size: 1vw;'>${numberWithCommas(product[i].price)} THB</p>
    </div>`;
        }
    }
    if (data == '') {
        $('#productlist').html(`<p>Not Found Product</p>`);
    } else {
        $('#productlist').html(data);
    }




}

function searchproduct(param) {
    console.log(param)
    $('.product-items').css('display', 'none')

    if (param == 'all') {
        $('.product-items').show();
    } else {
        // class+param ex class+shoe 
        $('.' + param).show();
    }



}

let productindex = 0;
const openproductdetail = (index) => {
    productindex = index;
    console.log(productindex)
    $('#modaldesc').css('display', 'flex')
    $('#mdd-img').attr('src', product[index].img)
    $('#mdd-name').text(product[index].name)
    $('#mdd-price').text(numberWithCommas(product[index].price) + ' THB')
    $('#mdd-desc').text(product[index].description)

}

function closemodal() {
    // let modal = document.querySelector('.modal');
    // modal.style.display = 'none'
    $('.modal').css('display', 'none')
}

let cart = [];
function addtocart() {
    let pass = true

    for (let i = 0; i < cart.length; i++) {
        if (productindex == cart[i].index) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }

    }

    if (pass) {
        let obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        cart.push(obj)


    }
    console.log(cart)

    swal.fire({

        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart!'
    })
    $('#cartcount').css('display', 'flex').text(cart.length)





}

const opencart = () => {

    $('#modalcart').css('display', 'flex')
    rendercart();

}

const rendercart = () => {
    if (cart.length > 0) {
        let data = '';
        for (let i = 0; i < cart.length; i++) {

            data += ` <div class="cartlist-item">
            <div class="cartlist-left">
                <img src="${cart[i].img}"
                    alt="">
                <div class="cardlist-detail">
                    <p style="font-size: 1.2vw;">${cart[i].name}</p>
                    <p>${numberWithCommas(cart[i].price * cart[i].count)}</p>
                </div>
            </div>
            <div class="cardlist-right">
                <p class="btnc" onclick="deinitem('-',${i})">-</p>
                <p id="countitems${i}" style="margin: 0 20px">${cart[i].count}</p>
                <p class="btnc" onclick="deinitem('+',${i})">+</p>
            </div>

        </div>`

        }
        $('#mycart').html(data)

    } else {
        $('#mycart').html(`<p>No product in cart</p>`)
    }
}

function deinitem(action, index) {
    if (action == '-') {
        if(cart[index].count > 0 ) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)
            rendercart();

            if(cart[index].count <= 0) {
                swal.fire ({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true ,
                    showCancelButton: true,
                    confirmButtontext: 'Delete',
                    cancelButtontext: 'Cancel'
                }).then((res) => {
                    if(res.isConfirmed) {
                        cart.splice(index, 1)
                        rendercart();
                        $('#cartcount').css('display', 'flex').text(cart.length)

                        if(cart.length <= 0) {
                            $('#cartcount').css('display', 'none')
                        }
                    } else {
                        cart[index].count++;
                        $("#countitems"+index).text(cart[index].count)
                        
                    }
                })

            }
        }
    }

    if (action == '+') {
        cart[index].count++;
            $("#countitems"+index).text(cart[index].count)
            rendercart();
    }
}
