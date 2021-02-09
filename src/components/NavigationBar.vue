<template>
  <div class="navigation-bar">
    <b-navbar toggleable="sm"
              type="light">
      <b-navbar-brand href="#">
        <img id="logo"
             alt="Sdui logo"
             src="../assets/100px.png"
             width="80px">
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse"
                  is-nav>
        <b-navbar-nav justified>
          <b-nav-item :to="'/'">Newsfeed</b-nav-item>
          <b-nav-item :to="'/sample1'">Sample 1</b-nav-item>
          <b-nav-item :to="'/sample2'">Sample 2</b-nav-item>
          <b-nav-item :to="'/sample3'">Sample 3</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
name: "NavigationBar"
}
</script>

<style scoped>
  .navigation-bar {
    margin-bottom: 20px;
  }
</style>