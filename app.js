const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");

const tl = gsap.timeline({ defaults: {duration: 1}});


// linea

const start = 
"M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";

const end = 
"M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";


// elastic effect

containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".placeholder");


    input.addEventListener("focus", () => {
        // este if verifica si esta vacio el input
        if(!input.value){
            tl.fromTo(line, {attr: {d: start}}, {attr: {d: end}, ease: "Power2.easeOut", duration: 0.75}
            );
            tl.to(line, {attr: {d: start}, ease: "elastic.out(3,0.5)" }, "<50%");  // para que vuelva la animation
            // placeholder shift
            tl.to(placeholder, {top: -15, left: 0, scale: 0.7, duration: 0.5, ease: "Power2.easeOut",}, "<15%");
        }
    });
});

// revert si no esta focus 

form.addEventListener("click", () => {
  containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".placeholder");

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeOut",
        });
      }
    }

    //  nuestra validacion
    // validacion del nombre
    input.addEventListener("input", (e) => {
      if(e.target.type === "text"){
        let inputText = e.target.value;
        if(inputText.length > 2){
          // coloree
          colorize("#6391E8", line, placeholder);
        }else{
          colorize("#F38C99", line, placeholder);
        }
      }
      // validacion de Email
      if(e.target.type === "email"){
        let valid = validateEmail(e.target.value);
        if(valid){
          // coloree
          colorize("#6391E8", line, placeholder);
        }else{
          colorize("#FE8C99", line, placeholder);
        }
      }
      // validacion de Phone
      if(e.target.type === "tel"){
        let valid = validatePhone(e.target.value);
        if(valid){
          // coloree
          colorize("#6391E8", line, placeholder);
        }else{
          colorize("#FE8C99", line, placeholder);
        }
      }
    });


    });
});


// check email validacione

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}


// coloreee functio


function colorize(color, line, placeholder){
  gsap.to(line, {stroke: color, duration: 0.75});
  gsap.to(placeholder, {color: color, duration: 0.75});
}  // *4:30 copiar aca lo pusheado que todavia no se pudo hacer
