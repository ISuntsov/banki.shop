const express = require('express')
const path = require('path')
const app = express()

let PICTURES = [
    {
        id: '001',
        name: '«Рождение Венеры» Сандро Боттичелли',
        img: 'img/1_VeneraBorn.jpg',
        price: '2 000 000 $',
        discount: '1 000 000 $',
        basket: false,
        sold: false
    },
    {
        id: '002',
        name: '«Тайная вечеря» Леонардо да Винчи',
        img: 'img/2_SecretEvening.jpg',
        price: '3 000 000 $',
        discount: '',
        basket: false,
        sold: false
    },
    {
        id: '003',
        name: '«Сотворение Адама» Микеланджело',
        img: 'img/3_CreateAdam.jpg',
        price: '6 000 000 $',
        discount: '5 000 000 $',
        basket: true,
        sold: false
    },
    {
        id: '004',
        name: '«Урок анатомии» Рембрандт',
        img: 'img/4_AnatomyLesson.jpg',
        price: '',
        discount: '',
        basket: false,
        sold: true
    }
]

app.use(express.json())

app.get('/api/pictures', (req, res) => {
    setTimeout(() => {
        res.status(200).json(PICTURES)
    }, 500)
})

app.put('/api/pictures/:id', (req, res) => {
    const idx = PICTURES.findIndex(c => c.id === req.params.id)
    PICTURES[idx] = req.body
    res.status(200).json(PICTURES[idx])
})


app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))