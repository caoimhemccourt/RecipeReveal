const tipsReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_TIPS':
            return {
                ...state,
                tips : action.tips
            }

        case 'SET_TIPS_NULL':
            return {
                ...state,
                tips: null
            }

        default :
            return state
    }
}

export default tipsReducer;