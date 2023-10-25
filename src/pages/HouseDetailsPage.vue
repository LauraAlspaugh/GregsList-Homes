<template>
    <div class="container-fluid">
        <section class="row">
            <div class="col-12 text-center p-4">
                <h1>House Details Page</h1>
            </div>
        </section>
        <section v-if="house" class="row">
            <div class="col-5">
                <img :src="house.imgUrl" :alt="house.name" class="img-fluid">
            </div>
            <div class="col-7">
                <h2>{{ house.year }} {{ house.name }}</h2>
                <h3>{{ house.bedrooms }} {{ house.bathrooms }} {{ house.levels }}</h3>
                <h3>{{ house.price }}</h3>
                <h4>{{ house.description }}</h4>
                <img :src="house.creator.picture" :alt="house.creator.name" class="creator">
                <h3>Listed By: {{ house.creator.name }}</h3>
                <button class="btn btn-danger text-center">Delete Car</button>
            </div>
        </section>
    </div>
    <HouseFormModelComponent />
</template>


<script>
import { useRoute, useRouter } from 'vue-router';
import { housesService } from '../services/HousesService.js';
import Pop from '../utils/Pop.js';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import HouseFormModelComponent from '../components/HouseFormModelComponent.vue';
import { logger } from '../utils/Logger.js';

export default {
    setup() {
        const route = useRoute();
        // const router = useRouter();
        async function getHouseById() {
            try {
                const houseId = route.params.houseId;
                await housesService.getHouseById(houseId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        onMounted(() => {
            logger.log(route.params.carId);
            getHouseById();
        });
        return {
            house: computed(() => AppState.activeHouse),
            account: computed(() => AppState.account),
        };
    },
    components: { HouseFormModelComponent }
}
</script>


<style lang="scss" scoped></style>