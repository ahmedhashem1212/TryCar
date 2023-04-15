/* eslint-disable no-console */

const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
// const allRoutes = require('express-list-endpoints');
// const passport = require('passport');
// const bodyParser = require('body-parser');
// const path = require('path');
// const populate = require('./populate');
// const https = require('https');
// var fs = require('fs');
// Require Router Handlers
const users = require('./api/routes/users.router');
const invoices = require('./api/routes/invoices.router');
const items = require('./api/routes/items.router');
// const doctors = require('./api/routes/doctors.router');
// const hospitals = require('./api/routes/hospital.router');
// const admins = require('./api/routes/admins.router');
// const files = require('./api/routes/s3.router');
import { Request, Response } from 'express';

// Require middleware
// const loggerMiddleware = require('./api/middleware/logger');

const app = express();
const port = 8080;

// Init middleware
// app.use(express.static(path.join(__dirname, 'public')))
// app.use('/api/v1/files', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(loggerMiddleware);

// Import DB configuration
const { sequelize } = require('./config/DBConfig');
// const mongo = require('./config/DBConfig').mongoURI;

// Test postgres connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to mysql 💪 .');
  })
  .catch((err:Error) => {
    console.error('Unable to connect to mysql 😳 .', err);
  });

//   interface Service {
//     name: string;
//     fullUrl: string;
//   }
// const explore = (req:Request, res:Response) => {
//   const routes = allRoutes(app);
//     const result: { ServiceList: Service[] } = {
//         ServiceList: [],
//       };
    


//   routes.forEach((route:any) => {
//     const name = route.path.split('/')[4];
//     result.ServiceList.push({
       
//         name,
//         fullUrl: route.path,
      
//     });
//   });
//   return res.json(result);
// };

// Direct to Route Handlers
// Explore
// app.use('/api/explore', explore);
app.use('/api/users', users);
app.use('/api/invoices', invoices);
app.use('/api/items', items);
// app.use('/api/doctors', doctors);
// app.use('/api/hospitals', hospitals);
// app.use('/api/admins', admins);
// app.use('/api/files', files);

// app.use((req: Request, res: Response) => {
//     res.status(404).send({ err: 'No such url' });
//   });
// app.get('/', (req:Request, res:Response) => {
//     console.log("hello")
//     res.send('Hello from express and typescript');
// });
// const eraseDatabaseOnSync = true;

// sequelize
//   .sync({ force: eraseDatabaseOnSync })
//   .then(() => console.log('Synced models with database 💃 .'))
//   .catch((error) =>
//     console.log('Could not sync models with database 🤦 .', error),
//   );

// mongoose
//   .connect(mongo, {
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log('MongoDB Connected...'))
//   // .then(() => mongoose.connection.db.dropDatabase())
//   // .then(() => console.log('Database Dropped'))
//   // .then(async () => {
//   //   await populate();
//   // })

//   .catch((err:Error) => console.log(err));

//   app.use(express.static(path.join(__dirname, 'client','build')));

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }
// const options = {
//   key: fs.readFileSync(
//     '/etc/letsencrypt/live/altabyb.com/privkey.pem',
//   ),
//   cert: fs.readFileSync(
//     '/etc/letsencrypt/live/altabyb.com/fullchain.pem',
//   ),
//   rejectUnauthorized: false,
// };

app.listen(port, () =>
  console.log(`Server up and running on ${port} 👍`),
);

// https
//   .createServer(options, app)
//   .listen(port, () =>
//     console.log(`Server up and running on ${port} 👍`),
//   );
