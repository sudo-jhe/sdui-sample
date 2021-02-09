<template>
  <div>
    <b-container class="newsfeed_toolbar" fluid="sm">
      <b-button-toolbar>
        <b-button-group size="sm"
                        class="mr-1">
          <b-button @click="openModalFormCreate">Create New</b-button>
        </b-button-group>
        <div>
          <b-dropdown size="sm"
                      class="mr-1"
                      :text="sortByDisplayText">
            <b-dropdown-item-button @click="SORT_BY(sortOption.propName)"
                                    v-for="sortOption in sortOptions"
                                    :key="sortOption.propName">{{sortOption.displayText}}</b-dropdown-item-button>
          </b-dropdown>
          <b-button @click="SORT_ORDER(false)"
                    v-if="sort_ascending"
                    variant="link"
                    size="sm">
            <b-icon-arrow-up></b-icon-arrow-up>
          </b-button>
          <b-button @click="SORT_ORDER(true)"
                    v-if="!sort_ascending"
                    variant="link"
                    size="sm">
            <b-icon-arrow-down></b-icon-arrow-down>
          </b-button>
        </div>
      </b-button-toolbar>
      <b-button-toolbar class="search">
        <b-input-group size="sm">
          <b-form-input size="sm"
                        class="mr-sm-2"
                        v-model="searchString"
                        placeholder="Search"></b-form-input>
        </b-input-group>
      </b-button-toolbar>
    </b-container>
    <b-container fluid="sm">
      <b-row v-for="item in items"
             :key="item.id">
        <b-col>
          <NewsFeedItem :news-feed-item="item"
                        :del-func="deleteNewsFeedItem"
                        :edit-func="openModalFormEdit"/>
        </b-col>
      </b-row>
      <div v-if="items.length <= 0">
        <h4>Nothing to be shown.. want me to add some demo data?</h4>
        <b-button-group size="sm"
                        class="mr-1">
          <b-button @click="ADD_DEMODATA()"
                    v-if="isEmpty">Yes!</b-button>
        </b-button-group>
      </div>
    </b-container>
    <b-modal id="modalCreateEdit"
             size="lg"
             title="Create News entry"
             header-bg-variant="dark"
             header-text-variant="light"
             body-bg-variant="light"
             body-text-variant="dark"
             footer-bg-variant="light"
             footer-text-variant="dark"
             @ok="onSubmitForm"
             @cancel="onCancelForm">
      <create-edit-news-form :news-feed-item="createEditFormData"
                             ref="newsForm"/>
    </b-modal>
  </div>
</template>

<script>
import NewsFeedItem from "@/components/NewsFeedItem";
import {mapMutations, mapGetters, mapState} from "vuex";
import {
  ADD_DEMODATA,
  ADD_NEWSFEED_ITEM,
  DEL_NEWSFEED_ITEM,
  EDIT_NEWSFEED_ITEM,
  SORT_BY,
  SORT_ORDER
} from "@/store/mutation-types";
import CreateEditNewsForm from "@/components/CreateEditNewsForm";

export default {
  name: "NewsFeed",
   components: {
     NewsFeedItem,
     CreateEditNewsForm
  },
  data: () => ({
    createEditFormData: {
      title: '',
      body: '',
      author: '',
      mode: 'create'
    },
    newsFeedItems: null,
    sortOptions: [{displayText:'Title', propName: 'title'}, {displayText:'Author', propName: 'author'}, {displayText:'Created on', propName: 'created_on'}],
    searchString: ''
  }),
  computed: {
    ...mapState(['sort_ascending', 'sort_by']),
    ...mapGetters(['filteredSortedNewsFeedItems']),
    isEmpty: function () {
      return this.items.length <= 0 && this.searchString === ''
    },
    sortByDisplayText: function () {
      return 'Sort by: ' + this.sortOptions.find((item) => item.propName === this.sort_by).displayText
    },
    items: function () {
      return this.filteredSortedNewsFeedItems(this.searchString)
    }
  },
  methods: {
    ...mapMutations([ADD_DEMODATA, ADD_NEWSFEED_ITEM, DEL_NEWSFEED_ITEM, EDIT_NEWSFEED_ITEM, SORT_BY, SORT_ORDER]),
    resetNewsInputForm: function () {
      this.createEditFormData = {
        title: '',
        body: '',
        author: '',
        mode: null
      }
    },
    addNewsFeedItem: function (item) {
      if (!item) return
      const newNewsFeedItem = {
        id: Date.now(),   // using current milliseconds as unique id
        title: item.title,
        body: item.body,
        author: item.author,
        created_on: new Date()
      }
      this.ADD_NEWSFEED_ITEM(newNewsFeedItem)
      this.$root.$bvToast.toast('News item was successfully created!', {title: 'Create succesful', variant: 'success', solid: true})
    },
    deleteNewsFeedItem: async function (item) {
      if (!item) return
      const res = await this.$bvModal.msgBoxConfirm('Are you sure you want to delete this?', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Yes',
        cancelTitle: 'No',
        footerClass: 'p-2',
        centered: true
      })
      if (!res) return
      this.DEL_NEWSFEED_ITEM(item)
      this.$root.$bvToast.toast('News item was successfully deleted!', {title: 'Delete succesful', variant: 'success', solid: true})
    },
    editNewsFeedItem: function (item) {
      if (!item) return
      this.EDIT_NEWSFEED_ITEM(item)
      this.$root.$bvToast.toast('News item was successfully changed!', {title: 'Edit succesful', variant: 'success', solid: true})
    },
    openModalFormCreate: function () {
      this.createEditFormData.mode = 'create'
      this.$bvModal.show('modalCreateEdit')
    },
    openModalFormEdit: function (item) {
      this.createEditFormData = {...item}
      this.createEditFormData.mode = 'update'
      this.$bvModal.show('modalCreateEdit')
    },
    onSubmitForm: function (event) {
      // Because form is modal and submit call is done via onSubmitForm on b-modal,
      // call validation on form and handle submit myself
      if (!this.$refs.newsForm.validateForm(event)) return
      if (this.createEditFormData.mode === 'create') this.addNewsFeedItem(this.createEditFormData)
      if (this.createEditFormData.mode === 'update') this.editNewsFeedItem(this.createEditFormData)
      this.resetNewsInputForm()
    },
    onCancelForm: function () {
      this.resetNewsInputForm()
    }
  }
}
</script>

<style scoped>
  .row, .newsfeed_toolbar {
    margin-bottom: 15px;
  }
  .search {
    margin-top: 15px;
  }
  .search > .input-group.input-group-sm {
    width: 100%;
  }
  .btn-toolbar {
    /*justify-content: space-between;*/
  }
</style>