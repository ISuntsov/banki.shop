import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js'

Vue.component('loader', {
    template: `
    <div style="display: flex;justify-content: center;align-items: center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Загрузка...</span>
      </div>
    </div>
  `
})


const Modal = {
    name: 'modal',
    template: '#modal',
    props: {
        pic: Object
    },
    methods: {
        close(event) {
            this.$emit('close');
        },
    },
};

new Vue({
    el: '#app',
    name: 'app',
    components: {
        modal: Modal,
    },
    data() {
        return {
            loading: false,
            search_input: '',
            search_input_fixed: '',
            pictures: [],
            isModalVisible: false,
            modalPicture: ''
        }
    },
    computed: {
        searchedPictures() {
            if (this.search_input_fixed.trim().toLocaleLowerCase()) {
                return this.pictures.filter((p) => {
                    return p.name.toLocaleLowerCase().includes(this.search_input_fixed);
                })
            }
            return this.pictures;
        }
    },
    methods: {
        changeSearch() {
            return this.search_input_fixed = this.search_input;
        },
        async toBasket(id) {
            const picture = this.pictures.find(p => p.id === id);
            const updatedPicture = await request(`/api/pictures/${id}`, 'PUT', {
                ...picture,
                basket: !picture.basket
            })
            picture.basket = updatedPicture.basket;
        },
        showModal(id) {
            this.isModalVisible = true;
            this.modalPicture = this.pictures.find(pic => pic.id === id);
        },
        closeModal() {
            this.isModalVisible = false;
        }
    },
    async mounted() {
        this.loading = true
        this.pictures = await request('/api/pictures')
        this.loading = false
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body
        
        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        
        const response = await fetch(url, {
            method,
            headers,
            body
        })
        
        return await response.json()
    } catch (e) {
        console.warn('Error', e.message)
    }
}