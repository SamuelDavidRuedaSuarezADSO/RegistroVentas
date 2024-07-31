export const soloNumeros = (event, element, element2)=>{
    let regex = /^[0-9]+$/;
    let input = element.value;
    console.log(input);
    if(input.length >= 10){
      event.preventDefault();
    }
    else if (!regex.test(event.key)) { 
      event.preventDefault();
      element.classList.add("error");
      element2.classList.add("error__icon");
      element.classList.remove("bien");
      element2.classList.remove("bien__icon");
    } else {
      element.classList.add("bien");
      element2.classList.add("bien__icon");
      element.classList.remove("error");
      element2.classList.remove("error__icon");
    }
  }