const outerFunc=()=>{
    let outerval="Hello";
    let innerFunc=()=>{
        console.log(outerval);
    }
    return innerFunc;
}

outerFunc();
