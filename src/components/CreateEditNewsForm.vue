<template>
  <b-form>
    <div v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <b-form-group id="input-grp-title"
                  label="Title:"
                  label-for="input-title"
                  description="Please choose a meaningful title">
      <b-form-input id="input-title"
                    v-model.trim="newsFeedItem.title"
                    placeholder="Enter title"
                    required></b-form-input>
    </b-form-group>
    <b-form-group id="input-grp-body"
                  label="Message:"
                  label-for="input-body"
                  description="Your content to be published">
      <b-form-textarea id="input-body"
                       v-model="newsFeedItem.body"
                       placeholder="Enter Message"
                       required
                       rows="3"></b-form-textarea>
    </b-form-group>
    <b-form-group id="input-grp-author"
                  label="Author:"
                  label-for="input-author"
                  description="Your name">
      <b-form-input id="input-author"
                    v-model.trim="newsFeedItem.author"
                    placeholder="Enter Name"
                    required
                    :disabled="newsFeedItem.mode !== 'create'"></b-form-input>
    </b-form-group>
  </b-form>
</template>

<script>

export default {
  name: "NewsForm",
  props: {
    newsFeedItem: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    errors: []
  }),
  methods: {
    // This could be much nicer with a 3rd party lib but for this example Ill keep it simple
    validateForm: function (event) {
      if (this.newsFeedItem.title && this.newsFeedItem.body && this.newsFeedItem.author) return true
      this.errors = []
      if (!this.newsFeedItem.title) this.errors.push('Title is required.')
      if (!this.newsFeedItem.body) this.errors.push('Content is required.')
      if (!this.newsFeedItem.author) this.errors.push('Author is required.')
      event.preventDefault()
      return false
    }
  }
}
</script>

<style scoped>

</style>