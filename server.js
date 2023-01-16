const express = require('express')
const req = require('express/lib/request')
const app = express()
require('dotenv').config()
const cookieParser =require("cookie-parser");

const mongoose= require('mongoose')
const cors = require('cors')
const Position = require("./models/position")
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(cookieParser())


const routerStores = require('./routes/stores.route.jsx')
const routerOrders = require('./routes/orders.route.jsx')
const routerVehicules = require('./routes/vehicules.route.jsx')
const routerDrivers = require('./routes/drivers.route.jsx')
const routerProducts = require('./routes/products.route.jsx')
const routerSuppliers = require('./routes/suppliers.route.jsx')
const routerUsers = require('./routes/users.route.jsx')
const routerClients = require('./routes/clients.route.jsx')
const routerAuth = require('./routes/auth.route.jsx')
const routerPositions = require('./routes/positions.route.jsx')
const routerDeliveries = require('./routes/deliveries.route.jsx')
const routerFactures = require('./routes/factures.route.jsx')
const routerVans = require('./routes/vans.route.jsx')
app.use('/VanAPI', routerVans)
app.use('/StoreAPI', routerStores)
app.use('/DeliveryAPI', routerDeliveries)
app.use('/PositionAPI', routerPositions)
app.use('/VehiculeAPI', routerVehicules)
app.use('/DriverAPI', routerDrivers)
app.use('/ProductAPI', routerProducts)
app.use('/SupplierAPI', routerSuppliers)
app.use('/UserAPI', routerUsers)
app.use('/ClientAPI', routerClients)
app.use('/OrderAPI', routerOrders)
app.use('/FactureAPI', routerFactures)
// app.use('/DeliveryAPI', routerDeliverys)
// app.use('/VehiculeStockAPI', routerVehiculeStocks)

app.use('/AuthAPI', routerAuth)




//  app.get('/test/:info',(req,res)=>{
   
//     let tab=req.params.info
//     var data = tab.split('||');
//     let new_position = new Position ({
//         id :data[0],
//         latitude :data[1],
//         longitude :data[2],
//         date :data[3],
//         time :data[4]
        
//      });
//      new_position.save()
//         console.log(data);
//       return res.status(200).json({
//           success:"Position save effactué avec succes"
//       });
//     });



mongoose.connect("mongodb+srv://iheb:ihs@cluster0.rwmbpkm.mongodb.net/?retryWrites=true&w=majority",
  (err, done)=>{
    if (err){
        console.log(err)

    }
    if(done){
        console.log('base de donnee connecter avec succes!');
    }
  }
);


app.listen(process.env.PORT || 3001);