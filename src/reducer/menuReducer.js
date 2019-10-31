export default (state = "home", action) => {
    switch (action.type){
        case "menu" : 
                state = action.payload
            break;
        default :
            break;
    }
    return state
}