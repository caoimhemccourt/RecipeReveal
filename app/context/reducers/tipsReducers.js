const tipsReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_TIPS':
            return {
                ...state,
                tips: action.tips
            }

        default:
            return state;
    }
}

export default tipsReducer;