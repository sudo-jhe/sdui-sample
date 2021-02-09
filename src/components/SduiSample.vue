<template>
  <div>
    <NavigationBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
import {mapMutations} from 'vuex';
import {ADD_DEMODATA} from "@/store/mutation-types";

export default {
  name: "SduiSample",
  components: {
    NavigationBar
  },
  created() {
    // TODO Sollte man solche Calls (Konstante für Mutation) in eine weitere Methode wrappen,
    //  damit sie "sprechender" wird?
    this.ADD_DEMODATA()
  },
  methods: {
    ...mapMutations([ADD_DEMODATA]),
  }
}
</script>

<style scoped>

</style>