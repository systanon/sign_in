document.addEventListener("DOMContentLoaded", function(event) {
 document.getElementById('pass2').disabled = true;
}); 
document.addEventListener("DOMContentLoaded", function(event) {
 document.getElementById('submit').disabled = true;
}); 


let login = document.getElementById('login'),
 passw = document.getElementById('pass'),
 submit = document.getElementById('submit'),
 passw2 = document.getElementById('pass2'),
 hash = "",
 test;


passw.oninput = function (event) {
  event.target.test = Boolean(event.target.value.length > 7 
    && event.target.value.match(/\d/)
      && event.target.value.match(/[a-z]/))
        event.target.style.color = event.target.test ? "green" : "red"
}   

passw.onchange = function (event) {
  if (event.target.test) {
      passw2.disabled = false
     
  }
} 
 
passw2.oninput = function (event) {
    event.target.style.color = event.target.value === passw.value ? 'green'
       : 'red'
}

passw2.onchange = function (event) {
   if (event.target.value === passw.value) {
      hash = Sha256.hash(event.target.value)
      submit.disabled = !(hash && login.value.match(/\S/))
   }
}

submit.onclick = function (event) {
   fetch(`https://garevna-rest-api.glitch.me/user/${login.value}`,{
      method: "POST",
      headers : {
         'Content-Type' :'application/json'
      },
      body: JSON.stringify({
         passhash :hash
      })
  
    })  .then(response => {
          console.log(response.ok)
          if (response.ok) {
            document.cookie = `login = ${login.value}`
            document.cookie = `hash = ${hash}`
          }
      })    
}





