const { createApp } = Vue;

createApp({
    data(){
        return {
            title: "Mailing List",
            emails: [],
            numOfEmails: 10,
        }
    },
    methods:{
        addEmailFromApi(){
            axios.get("https://flynn.boolean.careers/exercises/api/random/mail")
            .then((response) => {
                apiEmail = response.data.response;
                
                if (this.emails.includes(apiEmail)){
                    // se la mail esiste già richiedo un nuovo valore all'api
                    this.addEmailFromApi();
                } else {
                    this.emails = [
                        ...this.emails,
                        apiEmail
                    ];
                }
            })
        }
    },
    created(){
        for(let i=0; i<this.numOfEmails; i++){
            this.addEmailFromApi()
        }
    },
}).mount("#app");