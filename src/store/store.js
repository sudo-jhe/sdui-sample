import Vue from 'vue'
import Vuex from 'vuex'
import {
    ADD_DEMODATA,
    ADD_NEWSFEED_ITEM,
    DEL_NEWSFEED_ITEM,
    EDIT_NEWSFEED_ITEM,
    SORT_BY,
    SORT_ORDER
} from "@/store/mutation-types";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sort_by: 'created_on',
        sort_ascending: false,
        newsFeedItems: []
    },
    getters: {
        filteredSortedNewsFeedItems: (state) => (searchString) => {
            if (isValidSearchString(searchString)) return doSortItems(state.newsFeedItems.filter(item => newsFeedFilter(item, searchString)), state.sort_by, state.sort_ascending)
            return doSortItems(state.newsFeedItems, state.sort_by, state.sort_ascending)
        }
    },
    mutations: {
        [ADD_NEWSFEED_ITEM](state, newsFeedItem) {
            if (!newsFeedItem) return
            state.newsFeedItems = [...state.newsFeedItems, newsFeedItem]
        },
        [DEL_NEWSFEED_ITEM](state, newsFeedItem) {
            if (!newsFeedItem) return
            const index = state.newsFeedItems.findIndex((item) => item.id === newsFeedItem.id)
            if (index < 0) return
            state.newsFeedItems = state.newsFeedItems.slice(0, index).concat(state.newsFeedItems.slice(index + 1))
        },
        [ADD_DEMODATA](state) {
            state.newsFeedItems = [...demo_data]
        },
        [EDIT_NEWSFEED_ITEM](state, newsFeedItem) {
            if (!newsFeedItem) return
            state.newsFeedItems = [...state.newsFeedItems.filter(item => item.id !== newsFeedItem.id), newsFeedItem]
        },
        [SORT_BY](state, propName) {
            if (!propName) return
            state.sort_by = propName
        },
        [SORT_ORDER](state, ascending) {
            state.sort_ascending = ascending
        }
    }
})

const newsFeedFilter = (item, searchString) => item.title.toLowerCase().includes(searchString.toLowerCase()) || item.body.toLowerCase().includes(searchString.toLowerCase()) || item.author.toLowerCase().includes(searchString.toLowerCase())

const isValidSearchString = (searchString) => {
    return (searchString && searchString !== '' && typeof searchString === 'string')
}

const doSortItems = (arr, sort_by, ascending) => {
    const items = [...arr].sort((a,b) => {
        if(a[sort_by] > b[sort_by]){return 1}
        if(a[sort_by] < b[sort_by]){return -1}
        return 0
    })
    if(!ascending) items.reverse()
    return items
}

const demo_data = [{
    id: 0,
    title: 'Never Demo Your Software Without Meaningful Sample Data',
    body: 'Your team worked hard and the very first version of your software is ready. It\'s a big moment, to finally have something "clickable" to show for all the effort spent. Your client is equally enthusiastic, and you set up a demonstration for next week. But there is a problem.',
    author: 'Julian',
    created_on: new Date(2021, 1, 6, 15,0,0)
}, {
    id: 1,
    title: 'Your database is basically empty',
    body: 'Yes there is test data the developers used. But now you realize it\'s five different names and addresses, copied over and over again. With most of the other fields either empty. Or containing values like \'aaa\' or \'123\'. Maybe it is ok for development, but for real world users and their bosses?',
    author: 'Julian',
    created_on: new Date(2021, 1, 6, 14, 0, 0)
}, {
    id: 2,
    title: 'No way!',
    body: 'It doesn\'t communicate that your software is \'almost there\'. Neither that you understand your client and his business. Such data both looks ugly and communicates nothing. At best. Chances are you were in that situation before.',
    author: 'Julian',
    created_on: new Date(2021, 1, 6, 13, 0, 0)
}, {
    id: 3,
    title: 'And you all too well remember what happened that last time',
    body: 'That time you were in real hurry to finish software for the demo. And banged your head afterwards. You couldn\'t even show half functions of your system property. Because you had only couple of rows of data developers entered for their own testing. Clients kept stony faces for the whole demonstration. They simply couldn\'t experience what the system will be like, no matter how hard you tried.',
    author: 'Julian',
    created_on: new Date(2021, 1, 6, 12, 0, 0)
}]