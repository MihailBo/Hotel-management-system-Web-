
function bookingRoomType(){

    const type =document.getElementById("option");
    const single =document.getElementById("single");
    const double =document.getElementById("double");
    const deluxe =document.getElementById("deluxe");
    single.addEventListener("click", ()=> {
       type.innerHTML=single.innerHTML;
    });
    double.addEventListener("click", ()=> {
        type.innerHTML=double.innerHTML;
    });
    deluxe.addEventListener("click", ()=> {
        type.innerHTML=deluxe.innerHTML;
    });

    const singleBook =document.getElementById("singleBook");
    const doubleBook =document.getElementById("doubleBook");
    const deluxeBook =document.getElementById("deluxeBook");
    singleBook.addEventListener("click", ()=>{
        type.innerHTML="Single";
    })
    doubleBook.addEventListener("click", ()=>{
        type.innerHTML="Double";
    })
    deluxeBook.addEventListener("click", ()=>{
        type.innerHTML="Deluxe";
    })

}
bookingRoomType();


    document.getElementById("send").addEventListener("click", () => {
        const customer = {
            first_name: document.getElementById("nameInput").value,
            last_name: document.getElementById("lastNameInput").value,
            email: document.getElementById("emailInput").value,
            phoneNum: document.getElementById("phoneInput").value,
            idCard_id: document.getElementById("cardIdInput").value,
            password: document.getElementById("passwordInput").value
        };


        fetch("http://localhost:8080/customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            }).catch(err => console.log(err));
    });


function reservation(){
    document.getElementById("book").addEventListener("click", ()=>{

        const reservation = {
            customer_id: document.getElementById("customerId").value,
            room_id: document.getElementById("roomId").value,
            total_price: document.getElementById("totalPrice").value,
            check_in: document.getElementById("checkIn").value,
            check_out: document.getElementById("checkOut").value,
            status:

        }
    })
}
