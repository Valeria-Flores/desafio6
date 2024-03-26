const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// Configuración de Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true
}));

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Rutas
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
