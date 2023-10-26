<template>
    <div class="houses">
        <h1 class="text-center p-4">Browse Houses Today!</h1>
        <div class="col-12 text-center">
            <button v-if="account.id" class="btn fs-1 ms-3 text-center" type="button" title="Open House Form"
                data-bs-toggle="modal" data-bs-target="#houseFormModal">
                🏠
            </button>
        </div>
    </div>
    <div class="container-fluid">
        <section class="row">
            <div v-for="house in houses" :key="house.name" class="col-6 p-4">
                <HouseCardComponent :houseProp="house" />
            </div>
        </section>
    </div>
    <HouseFormModelComponent />
</template>


<script>
import { logger } from '../utils/Logger.js'
import { housesService } from '../services/HousesService.js'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState.js'
import HouseCardComponent from '../components/HouseCardComponent.vue'
import HouseFormModelComponent from '../components/HouseFormModelComponent.vue'

export default {
    setup() {
        async function getHouses() {
            try {
                await housesService.getHouses();
            }
            catch (error) {
                logger.error(error);
            }
        }
        onMounted(() => {
            housesService.clearData()
            getHouses();
        });
        return {
            houses: computed(() => AppState.houses),
            account: computed(() => AppState.account)
        };
    },
    components: { HouseCardComponent, HouseFormModelComponent }
}
</script>


<style lang="scss" scoped></style>