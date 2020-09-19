var express = require('express');
var router = express.Router();

const vacations = [
    {
        id: 1,
        desc: 'Coyhaique',
        price: 1000,
        picture: 'https://radiogenial.cl/wp-content/uploads/2019/09/foto-centro-coyhaique--696x426.jpg',
        from: new Date('2020-11-01'),
        to: new Date('2020-11-11'),
        followers: 5,
    }, {
        id: 2,
        desc: 'Puerto Aysén',
        price: 1000,
        picture: 'https://s0.wklcdn.com/image_38/1145035/7179015/4066224Master.jpg',
        from: new Date('2020-11-01'),
        to: new Date('2020-11-11'),
    }, {
        id: 3,
        desc: 'Punta Arenas',
        price: 2000,
        picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
        from: new Date('2020-12-01'),
        to: new Date('2020-12-05'),
    }, {
        id: 4,
        desc: 'Punta Arenas',
        price: 2000,
        picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
        from: new Date('2020-12-01'),
        to: new Date('2020-12-05'),
    }, {
        id: 5,
        desc: 'Punta Arenas',
        price: 2000,
        picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
        from: new Date('2020-12-01'),
        to: new Date('2020-12-05'),
    }, {
        id: 6,
        desc: 'Punta Arenas',
        price: 2000,
        picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
        from: new Date('2020-12-01'),
        to: new Date('2020-12-05'),
    }, {
        id: 7,
        desc: 'Punta Arenas',
        price: 2000,
        picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
        from: new Date('2020-12-01'),
        to: new Date('2020-12-05'),
    }, {
        id: 8,
        desc: 'Punta Arenas',
        price: 2000,
        picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
        from: new Date('2020-12-01'),
        to: new Date('2020-12-05'),
    }, {
        id: 9,
        desc: 'Punta Arenas',
        price: 2000,
        picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
        from: new Date('2020-12-01'),
        to: new Date('2020-12-05'),
    }, {
        id: 10,
        desc: 'Punta Arenas',
        price: 2000,
        picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
        from: new Date('2020-12-01'),
        to: new Date('2020-12-05'),
    }, {
        id: 11,
        desc: 'Punta Arenas',
        price: 2000,
        picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
        from: new Date('2020-12-01'),
        to: new Date('2020-12-05'),
    }, {
        id: 12,
        desc: 'Punta Arenas',
        price: 2000,
        picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
        from: new Date('2020-12-01'),
        to: new Date('2020-12-05'),
    }
];

/* GET home page. */
router.get('/all', function(req, res, next) {
    res.json(vacations);
});

module.exports = router;

