<template>
    <div class="modal fade" id="houseFormModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Create House</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="handleSubmit()">
                        <div class="mb-3">

                            <label for="name" class="form-label">Name</label>
                            <input v-model="editable.name" type="text" class="form-control" id="name" placeholder="name...">
                        </div>
                        <div class="mb-3">

                            <label for="bedrooms" class="form-label">Bedrooms</label>
                            <input v-model="editable.bedrooms" type="number" class="form-control" id="bedrooms"
                                placeholder="bedrooms..." required>
                        </div>
                        <div class="mb-3">

                            <label for="bathrooms" class="form-label">Bathrooms</label>
                            <input v-model="editable.bathrooms" type="number" class="form-control" id="bathrooms"
                                placeholder="bathrooms..." required>
                        </div>
                        <div class="mb-3">

                            <label for="levels" class="form-label">Levels</label>
                            <input v-model="editable.levels" type="number" class="form-control" id="levels"
                                placeholder="levels..." required>
                        </div>
                        <div class="mb-3">

                            <label for="year" class="form-label">Year</label>
                            <input v-model="editable.year" type="number" class="form-control" id="year"
                                placeholder="year..." required>
                        </div>
                        <div class="mb-3">

                            <label for="price" class="form-label">Price</label>
                            <input v-model="editable.price" type="number" class="form-control" id="price"
                                placeholder="price..." required>
                        </div>
                        <div class="mb-3">

                            <label for="imgUrl" class="form-label">imgUrl</label>
                            <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl"
                                placeholder="imgUrl..." required>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea v-model="editable.description" class="form-control" id="description"
                                rows="3"></textarea>

                        </div>
                        <div class="text-center">
                            <button class="btn btn-success" type="submit">Submit House</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import { housesService } from '../services/HousesService.js';
import { Modal } from 'bootstrap';


export default {


    setup() {
        const editable = ref({})
        return {
            editable,
            handleSubmit() {
                if (!editable.value.id) {
                    this.createHouse()
                }
                else {
                    this.editHouse()
                }
            },
            async createHouse() {
                try {
                    const houseData = editable.value
                    await housesService.createHouse(houseData)
                    editable.value = {}
                    Modal.getOrCreateInstance('#houseFormModal').hide()
                } catch (error) {
                    logger.error(error)

                }
            },
            async editHouse() {
                try {
                    const houseData = editable.value
                    await housesService.editHouse(houseData)
                    Modal.getOrCreateInstance('#houseFormModal').hide()
                } catch (error) {
                    logger.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>