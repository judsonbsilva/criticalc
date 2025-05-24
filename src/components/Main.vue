<script setup>
import { onMounted, ref, watch } from "vue";

import Drug from './Drug.vue'
import Navbar from './Navbar.vue'
import Searchbar from './Searchbar.vue'
import Footer from './Footer.vue'
import References from './References.vue'
import Iot from './pages/Iot.vue'

const props = defineProps({
  dataCSV: Array
});

const dataWeight = ref(null);
const dataHeight = ref(null);
const searchTerm = ref('');
const tag = ref(null);
const data = ref([]);

var drugId = 0;

const updateWeight = (val) => dataWeight.value = val.value;
const updateHeight = (val) => dataHeight.value = val.value;
const updateSearch = (val) => {
  searchTerm.value = val.value;
  tag.value = null;
}
const updateTag = (val) => {
  tag.value = val;
  searchTerm.value = "";
}

watch([dataWeight, dataHeight, searchTerm, tag], (tst) => {
  
  if(searchTerm.value) {
      data.value = props.dataCSV.filter(( el ) => {
        let temp = new RegExp(searchTerm.value, 'i');
        return temp.test(el.NOME);
      });
  }

  if( tag.value ) {
    console.log('TAG > ', tag.value);
    data.value = props.dataCSV.filter( (el) => el.PAGINA == tag.value );
  }
});

onMounted(() => {
  data.value = props.dataCSV;
})
</script>

<template>
  <div>
    <Navbar @updateWeight=updateWeight @updateHeight=updateHeight />
    <Searchbar @search=updateSearch @filterTag=updateTag />
    <Iot v-if="tag == 'iot'"/>
    <div v-if=data>
      <Drug
        v-for="drug in data"
        :drugData="drug"
        :height="dataHeight"
        :weight="dataWeight"
        :tag="tag"
        :key=drugId++
      />
    </div>
    <References />
    <Footer />
  </div>
</template>

<style scoped>
</style>
