import { create } from 'zustand'

export const EFormPath = {
    CANT_COME: 'CANT_COME', 
    JUST_ME: 'JUST_ME', 
    ME_AND_CREW: 'ME_AND_CREW', 
}

export const useStore = create((set) => ({
    _userAttendance: null,
    updateUserAttendance:    (v) => set({ _userAttendance: v }),
    
    _userName: null,
    updateUserName:         (v) => set({ _userName: v }),
    
    _userEmail: null,
    updateUserEmail:        (v) => set({ _userEmail: v }),

    _userHasCrew: null,
    updateUserHasCrew:        (v) => set({ _userHasCrew: v }),

    _userCrewList:[],
    updateUserCrewList:        (v) => set({ _userCrewList: v }),
    
    _activeFormStep: 'you',
    updateActiveFormStep:   (v) => set({ _activeFormStep: v }),
    
    _formPath: null,
    updateFormPath:   (v) => set({ _formPath: v }),
    



    _countdownString:null,
    updateCountdownString:  (v) => set({ _countdownString: v }),
    

    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
}))