// viết code call api
// ajax call api (jquery)
// fetch - promise js thuần
// thư viện axios (reactjs)


// HTML- JS : DOM API

// Jquery là giải pháp rút gọn code 
// $ 

// $("selector").action()

// console.log($("#input").val());


// ajax 
// $("#btn").click(function(){
//     // call api
//     $.ajax({
//         url : "http://localhost:8080/api.rikkei.vn/v1/products",
//         method : "GET",
//         success : function(data){

//         },
//         error: function(err){
//             console.log(err);
//         }
//     })
// })

// hiển thị danh sách 

function resetForm(){
    $("#name").val("");
    $("#price").val("");
    $("#stock").val("");
    $("#description").val("");
}

function renderProducts() {
    // lấy được danh dách và hiện thị ở ô tbody
    $.ajax({
        url: "http://localhost:8080/api.rikkei.vn/v1/products",
        method: "GET",
        success: function (data) {
            let html = data?.reduce((temp,item)=>temp+`<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><img src="${item.imageUrl}" alt="" width="100" height="100" style="object-fit: cover;"></td>
            <td>${item.stock}</td>
            <td><button onclick="editProduct(${item.id})">Edit</button></td>
            <td><button onclick="deleteProduct(${item.id})">Delete</button></td>
        </tr>`,"")
        $("#products").html(html);
        $("#add").show();
        $("#update").hide();
        },
        error: function (err) {
            console.log(err);
        }
    })
}
renderProducts();

function deleteProduct(id){
    if(confirm("Are you sure you want to delete")){
        $.ajax({
        url: "http://localhost:8080/api.rikkei.vn/v1/products/"+id,
        method: "DELETE",
        success: function (data) {
            renderProducts();
        },
        error: function (err) {
            console.log(err);
        }
    })
    }
}

function addProduct(){
    // lấy ra được các giá trị của ô input
    let name = $("#name").val();
    let price = $("#price").val();
    let stock = $("#stock").val();
    let description = $("#description").val();
    let image = $("#file")[0].files[0];
   

    // form data
    let data = new FormData();
    data.append("name",name);
    data.append("price",price);
    data.append("stock",stock);
    data.append("description",description);
    data.append("file",image);

    // // gọi api
    $.ajax({
        url: "http://localhost:8080/api.rikkei.vn/v1/products",
        data: data,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            console.log(data);
            renderProducts();
            resetForm();
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function editProduct(id){
    // lấy data và chèn giá trị vào các ô input
    $.ajax({
        url: "http://localhost:8080/api.rikkei.vn/v1/products/"+id,
        method: "GET",
        success: function (data) {
            $("#name").val(data.name);
            $("#price").val(data.price);
            $("#stock").val(data.stock);
            $("#description").text(data.description);
            $("#id").val(data.id);
            $("#preview").attr("src",data.imageUrl)
            // thay thế button  = update
            // ẩn nút add 
            $("#add").hide();
            $("#update").show();
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function updateProduct(){
    // lấy ra được các giá trị của ô input
    let id = $("#id").val();
    let name = $("#name").val();
    let price = $("#price").val();
    let stock = $("#stock").val();
    let description = $("#description").val();
    let image = $("#file")[0].files[0];
   

    // form data
    let data = new FormData();
    data.append("name",name);
    data.append("price",price);
    data.append("stock",stock);
    data.append("description",description);
    if(image){
        data.append("file",image);
    }

    // // gọi api
    $.ajax({
        url: "http://localhost:8080/api.rikkei.vn/v1/products/"+id,
        data: data,
        processData: false,
        contentType: false,
        type: 'PUT',
        success: function (data) {
            console.log(data);
            renderProducts();
            resetForm();
        },
        error: function (err) {
            console.log(err);
        }
    })
}


