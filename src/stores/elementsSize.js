import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useElmentsSizeStore = defineStore('elementsSize', ()=>{
 
    const theChatContactsSize = ref(null)



    return {
        theChatContactsSize
    }
});