<template>
  <b-container>
    <h4>{{displayText}}</h4>
  </b-container>
</template>

<script>
export default {
  name: "SamplePage",
  props: {
    displayText: {
      type: String,
      require: true
    }
  }
}
</script>

<style scoped>

</style>