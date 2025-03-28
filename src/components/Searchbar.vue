<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search', 'filterTag']);
const searchTerm = ref('');
const tag = ref(null);

const handleSearch = (ev) => {
    searchTerm.value = ev.target.value;
    emit('search', searchTerm);
}

const handleTag = (name) => {
    tag.value = name;
    emit('filterTag', name);
}

</script>

<template>
    <div class="panel is-link">
        <p class="panel-tabs" id="input-click-tag">
            <a @click="handleTag('sedativo')">
                <span class="icon is-small"><i class="fas fa-capsules" aria-hidden="true"></i></span>
                <span>Sedativos</span>
            </a>
            <a @click="handleTag('dva')">
                <span class="icon is-small"><i class="fas fa-capsules" aria-hidden="true"></i></span>
                <span>Droga vasoativa</span>
            </a>
            <a @click="handleTag('pcr')">
                <span class="icon is-small"><i class="fas fa-heart-circle-xmark"></i></span>
                <span>PCR</span>
            </a>
            <a @click="handleTag('iot')">
                <span class="icon is-small"><i class="fas fa-lungs" aria-hidden="true"></i></span>
                <span>Intubação</span>
            </a>
            <a @click="handleTag('outro')">
                <span class="icon is-small"><i class="fas fa-plus" aria-hidden="true"></i></span>
                <span>Outros</span>
            </a>
        </p>
        <div class="panel-block">
            <p class="control has-icons-left">
                <input
                    id="input-search"
                    class="input"
                    type="text"
                    placeholder="noradrenalina"
                    @input=handleSearch
                />
                <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </span>
            </p>
        </div>
    </div>
</template>

<style scoped>
</style>
