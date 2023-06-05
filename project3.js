const outerFunc=()=>{
    let outerval="Hello";
    let innerFunc=()=>{
        console.log(outerval);
    }
   
}

outerFunc();
