const { createApp } = Vue;

createApp({
    data(){
        return {
            title: "Mailing List",
            emails: [],
            numOfEmails: 12,
        }
    },
    methods:{
        addEmailFromApi(parentList){
            axios.get("https://flynn.boolean.careers/exercises/api/random/mail")
            .then((response) => {
                apiEmail = response.data.response;
                
                if (parentList.includes(apiEmail)){
                    // se la mail esiste già richiedo un nuovo valore all'api
                    this.addEmailFromApi();
                } else {
                    parentList.push(apiEmail)
                }

                if (parentList.length === this.numOfEmails){
                    this.emails = parentList
                }
            })
        }
    },
    created(){
        const tempList = []
        for(let i=0; i<this.numOfEmails; i++){
            this.addEmailFromApi(tempList)
        }
    },
}).mount("#app");