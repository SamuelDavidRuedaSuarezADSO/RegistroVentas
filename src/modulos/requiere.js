const requidos = (event, form)=>{
    event.preventDefault();
    let verdad = true;
    const cunsul = document.querySelectorAll(form)
    cunsul.forEach(element=>{
        if(element.value == ""){
            element.classList.add("error");
            element.classList.remove("bien");
            verdad = false;
        }
    })
    return verdad;  
}
export default requidos;