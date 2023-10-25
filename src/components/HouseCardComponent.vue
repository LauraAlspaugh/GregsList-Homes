<template>
    <router-link :to="{ name: 'HouseDetails', params: { houseId: houseProp.id } }">
        <section class="row rounded bg-light shadow">
            <div class="col-4 p-0">
                <img class="img-fluid rounded-start" :src="houseProp.imgUrl" :alt="houseProp.year">
            </div>
            <div class="col-8 p-5">
                <h2>{{ houseProp.name }}</h2>
                <h3>{{ houseProp.price }}</h3>
            </div>
        </section>
    </router-link>
</template>


<script>
import { House } from '../models/House.js';



export default {
    props: {
        houseProp: { type: House },
    },
    setup() {
        return {};
    },

}
</script>


<style lang="scss" scoped>
img {
    height: 30vh;
    width: 100%;
    object-fit: cover;
}
</style>