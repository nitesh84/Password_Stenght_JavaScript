const strengthMeter=document.getElementById("strength-meter");
const passwordInput=document.getElementById("password-input");
const reasons=document.getElementById("reasons");



passwordInput.addEventListener('input',updateStrenghthMeter);


function updateStrenghthMeter(){
    const weaknesses=calculatePasswordStregth(passwordInput.value);
   
    let strength=100;
    reasons.innerHTML='';
   
    weaknesses.map((obj)=>{
        if(obj==null) return
        strength-=obj.dedecution;
        const messageElement=document.createElement("div");
        messageElement.innerHTML=obj.message;
        reasons.appendChild(messageElement);
    })
    console.log(strength);

    strengthMeter.style.setProperty("--strength",strength);
}

function calculatePasswordStregth(password){
    const weaknesses=[];

    weaknesses.push(lengthWeaknesses(password));
    weaknesses.push(helperTypeWeakness(password,/[a-z]/g,"Lower Case"));  //LowerCase Weakness
    weaknesses.push(helperTypeWeakness(password,/[A-Z]/g,"Upper Case"));  //UpperCase Weakness
    weaknesses.push(helperTypeWeakness(password,/[0-9]/g,"Numbers"));     //Number Weakness
    weaknesses.push(helperTypeWeakness(password,/[^a-zA-Z\s0-9]/g,"Special"))
    



    return weaknesses;
}



function lengthWeaknesses(password){
    const length=password.length;
    if(length<5){
        return {
            message:"Password is too short",
            dedecution:40
        }
    }

    if(length<8){
        return{
            message:"Password can be longer",
            dedecution:15   
        }
    }

}

function helperTypeWeakness(password,regex,messageText){
    const match= password.match(regex) || [];//Returns an array 

   if(match.length===0){
    return{
        message:`Your password has no ${messageText} Characters`,
        dedecution:20
    }
   }
   if(match.length<=2){
    return{
        message:`Not enough ${messageText} Characters`,
        dedecution:5
    }
   }
}


