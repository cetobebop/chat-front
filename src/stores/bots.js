import { defineStore } from 'pinia';
 

import { useUserStore } from './user';

export const useBotsStore = defineStore('bots',() => {
    
    const userStore = useUserStore();

    

    function verifyUserIsABot (receiverId){
        return userStore.otherConnectedUsers[receiverId].bot
    }

    return {
        verifyUserIsABot
    }

});