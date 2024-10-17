// require('dotenv').config();

// const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');


// const corsOptions = {
//     origin: (origin, callback) => {
//         // Allow requests with no origin (e.g., mobile apps, Postman, server-side requests) OR if the origin is in the allowedOrigins array
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true); // Allow the request
//         } else {
//             callback(new Error('CORS not allowed from this origin')); // Block the request
//         }
//     },
//     credentials: true, // Allow cookies or other credentials to be sent in CORS requests
//     optionsSuccessStatus: 200 // For legacy browser support
// };

// module.exports = corsOptions;
