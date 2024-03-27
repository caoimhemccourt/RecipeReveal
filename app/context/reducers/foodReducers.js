const foodReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_FOOD':
            return {
                ...state,
                food : action.food
            }

        case 'SET_FOOD_NULL':
            return {
                ...state,
                food : null
            }

        default : 
            return state
    }
}

export default foodReducer;