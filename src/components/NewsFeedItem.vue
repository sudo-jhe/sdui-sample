<template>
  <div>
    <b-card :title="newsFeedItem.title"
            :sub-title="subtitle">
      <b-card-text>{{newsFeedItem.body}}</b-card-text>
      <div class="float-right">
        <b-button @click="deleteItem(newsFeedItem)"
                  variant="link">
          <b-icon-trash></b-icon-trash>
        </b-button>
        <b-button @click="editItem(newsFeedItem)"
                  variant="link">
          <b-icon-pencil></b-icon-pencil>
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "NewsFeedItem",
  props: {
    newsFeedItem: {
      type: Object,
      require: true
    },
    delFunc: {
      type: Function,
      require: true
    },
    editFunc: {
      type: Function,
      require: true
    }
  },
  computed: {
    subtitle: function () {
      return moment(this.newsFeedItem.created_on).format('DD.MM.YYYY hh:mm') + ' by ' + this.newsFeedItem.author
    }
  },
  methods: {
    deleteItem: function (item) {
      this.delFunc(item)
    },
    editItem: function (item) {
      this.editFunc(item)
    }
  }
}
</script>

<style scoped>
  h6 .h6 {
    font-size: 0.8rem;
  }
</style>