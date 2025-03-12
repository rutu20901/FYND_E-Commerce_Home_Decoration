<template>
    <div id="container">
        <h1>Shipping address</h1>
        <div class="add">
            <input type="text" v-model="email" placeholder="Email-id" /><br>
            <input type="text" v-model="pin" placeholder="PIN Code" /><br>
            <input type="text" v-model="address" placeholder="Address" /><br>
            <input type="text" v-model="mobile" placeholder="Mobile" /><br>
        </div>
    </div>
    <div id="container2">
        <h1>Payment</h1>
        <div class="pay">
            <input type="text" v-model="name" placeholder="Name" required/><br>
            <input type="text" v-model="card" placeholder="Creadit Card Number" required/><br>
            <input type="password" v-model="expiry" placeholder="Expiration Date" required /><br>
            <input type="password" v-model="cvv" placeholder="Security Code" required/><br>
        </div>
    </div><br><br>
    <button v-on:click="save">Save</button>
</template>
<script>
import axios from 'axios';
export default{
    name: 'userShipping',
        data(){
            return{
                email:'',
                pin:'',
                address:'',
                first_name:'',
                last_name:'',
                mobile:''
            }
        },
        methods:{
            async save(){
                let result = await axios.post("http://localhost:3000/userAddress",{
                    email:this.email,
                    pin:this.pin,
                    address:this.address,
                    first_name:this.first_name,
                    last_name:this.last_name,
                    mobile:this.mobile
                });
    
                console.warn(result);
                /*
                if(result.status == 201){
                    localStorage.setItem("user-add",JSON.stringify(result.data));
                    this.$router.push({name:'userPayment'});
                }*/
            }
        },
    
       
};
</script>
    <style scoped>
    input{
        padding: 0.5rem;
        margin: 1rem 0 1rem 0;
        width: 60%;
        font-size: 1rem;
    }
    
    button{
        padding: 0.6rem 1rem;
        font-size: 1rem;
        background-color: green;
        color: white;
        outline: none;
        border: 1px solid black;
        width: 25%;
        border-radius: 6px;
        cursor: pointer;
        height: 10%;
        margin-left: 0rem;
      }
      button:hover{
        background-color: white;
        color: green;
      }

      #container{
        width: 50%;
      }

      #container2{
        width: 50%;
        float: right;
        margin-top: -22rem
      }
    </style>