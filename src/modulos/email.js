const soloEmial = (event , element)=>{
    let rege =  /^[\w-._]+@[\w.-_]+(\.[a-zA-Z]{2,4}){1,2}$/;
    if(!rege.test(element)){
        event.preventDefault();
        element.classList.add("error");
        element.classList.remove("bien");
    }
    else{
        element.classList.add("bien");
        element.classList.remove("error");
    }
}

export default soloEmial;