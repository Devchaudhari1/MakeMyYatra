//routes\routes.js
const express=require('express');
const path = require('path');
const cors=  require('cors');
const Route =  express();
const axios=require('axios');
//const bodyparser= require('body-parser');
Route.use(cors({origin:'*' ,methods:['POST','GET','PUT','DELETE','PATCH'], allowedHeaders:['Authorization']}));
Route.use(express.json());
Route.use(express.static(path.join(__dirname , '../views')));
Route.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../views','homepage.html'));
});

Route.use(express.static(path.join(__dirname , '../views','bootstrap')));

Route.get('/index',(req , res)=>{
    res.sendFile(path.join(__dirname , '../views','index.html'));
});

const {addactivities,getactivities,deleteactivities , updateactivities}= require('../controllers/activities.js');



//middleware

const {upload} = require('../middlewares/upload.js');



//maps
const {searchPlace}=require('../controllers/map.js');

Route.get('/map/:id',searchPlace);
Route.get('/mapPage', (req,res) =>{
    res.sendFile(path.join(__dirname , '../views' , 'map.html'));
});
Route.get('/activitiesPage',(req , res)=>{
    res.sendFile(path.join(__dirname , '../views','activities.html'));
   });
   
   Route.get('/activities' , getactivities);
   Route.post('/activities' ,addactivities);
   Route.delete('/activities/:id',deleteactivities);
   Route.put('/activities/:id',updateactivities);


// routes/routes.js



const {addactivity_bookings,getactivity_bookings,deleteactivity_bookings , updateactivity_bookings,applyFilterSearchactivity_bookings,getactivity_bookingsLike,getactivity_bookingsBy}= require('../controllers/activity_bookings.js');
Route.get('/activity_bookingsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','activity_bookings.html'));
});

Route.get('/activity_bookings' , getactivity_bookings);

Route.post('/activity_bookings' ,addactivity_bookings);

Route.delete('/activity_bookings/:id',deleteactivity_bookings);

Route.put('/activity_bookings/:id',updateactivity_bookings);


Route.get('/activity_bookingsBy',getactivity_bookingsBy);

Route.get('/activity_bookingsLike',getactivity_bookingsLike);

 Route.get('/activity_bookingsSearch',applyFilterSearchactivity_bookings);

 
const {addbus,getbus,deletebus , updatebus,applyFilterSearchbus,getbusLike,getbusBy}= require('../controllers/bus.js');

Route.get('/busPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','bus.html'));
});

Route.get('/bus' , getbus);

Route.post('/bus' ,addbus);

Route.delete('/bus/:id',deletebus);

Route.put('/bus/:id',updatebus);


Route.get('/busBy',getbusBy);

Route.get('/busLike',getbusLike);

 Route.get('/busSearch',applyFilterSearchbus);



// routes/routes.js



const {addbusbookings,getbusbookings,deletebusbookings , updatebusbookings,applyFilterSearchbusbookings,getbusbookingsLike,getbusbookingsBy}= require('../controllers/busbookings.js');
Route.get('/busbookingsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','busbookings.html'));
});

Route.get('/busbookings' , getbusbookings);

Route.post('/busbookings' ,addbusbookings);

Route.delete('/busbookings/:id',deletebusbookings);

Route.put('/busbookings/:id',updatebusbookings);


Route.get('/busbookingsBy',getbusbookingsBy);

Route.get('/busbookingsLike',getbusbookingsLike);

 Route.get('/busbookingsSearch',applyFilterSearchbusbookings);






// routes/routes.js



const {addusers,getusers,deleteusers , updateusers,applyFilterSearchusers,getusersLike,getusersBy}= require('../controllers/users.js');     
Route.get('/usersPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','users.html'));
});

Route.get('/users' , getusers);

Route.post('/users' ,addusers);

Route.delete('/users/:id',deleteusers);

Route.put('/users/:id',updateusers);

Route.patch('/users/:id',upload);

Route.get('/usersBy',getusersBy);

Route.get('/usersLike',getusersLike);

 Route.get('/usersSearch',applyFilterSearchusers);




// routes/routes.js



const {addrestaurants,getrestaurants,deleterestaurants , updaterestaurants,applyFilterSearchrestaurants,getrestaurantsLike,getrestaurantsBy}= require('../controllers/restaurants.js');
Route.get('/restaurantsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','restaurants.html'));
});

Route.get('/restaurants' , getrestaurants);

Route.post('/restaurants' ,addrestaurants);

Route.delete('/restaurants/:id',deleterestaurants);

Route.put('/restaurants/:id',updaterestaurants);


Route.get('/restaurantsBy',getrestaurantsBy);

Route.get('/restaurantsLike',getrestaurantsLike);

 Route.get('/restaurantsSearch',applyFilterSearchrestaurants);


// routes/routes.js



const {addplaces,getplaces,deleteplaces , updateplaces,applyFilterSearchplaces,getplacesLike,getplacesBy}= require('../controllers/places.js');
Route.get('/placesPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','places.html'));
});

Route.get('/places' , getplaces);

Route.post('/places' ,addplaces);

Route.delete('/places/:id',deleteplaces);

Route.put('/places/:id',updateplaces);


Route.get('/placesBy',getplacesBy);

Route.get('/placesLike',getplacesLike);

 Route.get('/placesSearch',applyFilterSearchplaces);




// routes/routes.js



const {addweather_info,getweather_info,deleteweather_info , updateweather_info,applyFilterSearchweather_info,getweather_infoLike,getweather_infoBy}= require('../controllers/weather_info.js');
Route.get('/weather_infoPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','weather_info.html'));
});

Route.get('/weather_info' , getweather_info);

Route.post('/weather_info' ,addweather_info);

Route.delete('/weather_info/:id',deleteweather_info);

Route.put('/weather_info/:id',updateweather_info);


Route.get('/weather_infoBy',getweather_infoBy);

Route.get('/weather_infoLike',getweather_infoLike);

 Route.get('/weather_infoSearch',applyFilterSearchweather_info);

 
 


const {addlogs,getlogs,deletelogs , updatelogs,applyFilterSearchlogs,getlogsLike,getlogsBy}= require('../controllers/logs.js');
Route.get('/logsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','logs.html'));
});

Route.get('/logs' , getlogs);

Route.post('/logs' ,addlogs);

Route.delete('/logs/:id',deletelogs);

Route.put('/logs/:id',updatelogs);


Route.get('/logsBy',getlogsBy);

Route.get('/logsLike',getlogsLike);

 Route.get('/logsSearch',applyFilterSearchlogs);



 
// routes/routes.js



const {addbusiness_partners,getbusiness_partners,deletebusiness_partners , updatebusiness_partners,applyFilterSearchbusiness_partners,getbusiness_partnersLike,getbusiness_partnersBy}= require('../controllers/business_partners.js');
Route.get('/business_partnersPage',(req , res)=>{   
 res.sendFile(path.join(__dirname , '../views','business_partners.html'));
});

Route.get('/business_partners' , getbusiness_partners);

Route.post('/business_partners' ,addbusiness_partners);

Route.delete('/business_partners/:id',deletebusiness_partners);

Route.put('/business_partners/:id',updatebusiness_partners);


Route.get('/business_partnersBy',getbusiness_partnersBy);

Route.get('/business_partnersLike',getbusiness_partnersLike);

 Route.get('/business_partnersSearch',applyFilterSearchbusiness_partners);


 
// routes/routes.js



const {addcabbookings,getcabbookings,deletecabbookings , updatecabbookings,applyFilterSearchcabbookings,getcabbookingsLike,getcabbookingsBy}= require('../controllers/cabbookings.js');
Route.get('/cabbookingsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','cabbookings.html'));
});

Route.get('/cabbookings' , getcabbookings);

Route.post('/cabbookings' ,addcabbookings);

Route.delete('/cabbookings/:id',deletecabbookings); 

Route.put('/cabbookings/:id',updatecabbookings);    


Route.get('/cabbookingsBy',getcabbookingsBy);       

Route.get('/cabbookingsLike',getcabbookingsLike);   

 Route.get('/cabbookingsSearch',applyFilterSearchcabbookings);



// routes/routes.js



const {addcabdrivers,getcabdrivers,deletecabdrivers , updatecabdrivers,applyFilterSearchcabdrivers,getcabdriversLike,getcabdriversBy}= require('../controllers/cabdrivers.js');
Route.get('/cabdriversPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','cabdrivers.html'));
});

Route.get('/cabdrivers' , getcabdrivers);

Route.post('/cabdrivers' ,addcabdrivers);

Route.delete('/cabdrivers/:id',deletecabdrivers);   

Route.put('/cabdrivers/:id',updatecabdrivers);      


Route.get('/cabdriversBy',getcabdriversBy);

Route.get('/cabdriversLike',getcabdriversLike);     

 Route.get('/cabdriversSearch',applyFilterSearchcabdrivers);

 // routes/routes.js



const {addcabs,getcabs,deletecabs , updatecabs,applyFilterSearchcabs,getcabsLike,getcabsBy}= require('../controllers/cabs.js');    
Route.get('/cabsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','cabs.html'));
});

Route.get('/cabs' , getcabs);

Route.post('/cabs' ,addcabs);

Route.delete('/cabs/:id',deletecabs);

Route.put('/cabs/:id',updatecabs);


Route.get('/cabsBy',getcabsBy);

Route.get('/cabsLike',getcabsLike);

 Route.get('/cabsSearch',applyFilterSearchcabs);


 
// routes/routes.js



const {addcurrencies,getcurrencies,deletecurrencies , updatecurrencies,applyFilterSearchcurrencies,getcurrenciesLike,getcurrenciesBy}= require('../controllers/currencies.js');
Route.get('/currenciesPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','currencies.html'));
});

Route.get('/currencies' , getcurrencies);

Route.post('/currencies' ,addcurrencies);

Route.delete('/currencies/:id',deletecurrencies);   

Route.put('/currencies/:id',updatecurrencies);      


Route.get('/currenciesBy',getcurrenciesBy);

Route.get('/currenciesLike',getcurrenciesLike);     

 Route.get('/currenciesSearch',applyFilterSearchcurrencies);



// routes/routes.js



const {addcurrency_conversion_rates,getcurrency_conversion_rates,deletecurrency_conversion_rates , updatecurrency_conversion_rates,applyFilterSearchcurrency_conversion_rates,getcurrency_conversion_ratesLike,getcurrency_conversion_ratesBy}= require('../controllers/currency_conversion_rates.js');
Route.get('/currency_conversion_ratesPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','currency_conversion_rates.html'));
});

Route.get('/currency_conversion_rates' , getcurrency_conversion_rates);

Route.post('/currency_conversion_rates' ,addcurrency_conversion_rates);

Route.delete('/currency_conversion_rates/:id',deletecurrency_conversion_rates);

Route.put('/currency_conversion_rates/:id',updatecurrency_conversion_rates);


Route.get('/currency_conversion_ratesBy',getcurrency_conversion_ratesBy);

Route.get('/currency_conversion_ratesLike',getcurrency_conversion_ratesLike);

 Route.get('/currency_conversion_ratesSearch',applyFilterSearchcurrency_conversion_rates);


 // routes/routes.js



const {addemail_notifications,getemail_notifications,deleteemail_notifications , updateemail_notifications,applyFilterSearchemail_notifications,getemail_notificationsLike,getemail_notificationsBy}= require('../controllers/email_notifications.js');
Route.get('/email_notificationsPage',(req , res)=>{ 
 res.sendFile(path.join(__dirname , '../views','email_notifications.html'));
});

Route.get('/email_notifications' , getemail_notifications);

Route.post('/email_notifications' ,addemail_notifications);

Route.delete('/email_notifications/:id',deleteemail_notifications);

Route.put('/email_notifications/:id',updateemail_notifications);


Route.get('/email_notificationsBy',getemail_notificationsBy);

Route.get('/email_notificationsLike',getemail_notificationsLike);

Route.get('/email_notificationsSearch',applyFilterSearchemail_notifications);


// routes/routes.js



const {addemail_templates,getemail_templates,deleteemail_templates , updateemail_templates,applyFilterSearchemail_templates,getemail_templatesLike,getemail_templatesBy}= require('../controllers/email_templates.js');
Route.get('/email_templatesPage',(req , res)=>{     
 res.sendFile(path.join(__dirname , '../views','email_templates.html'));
});

Route.get('/email_templates' , getemail_templates); 

Route.post('/email_templates' ,addemail_templates); 

Route.delete('/email_templates/:id',deleteemail_templates);

Route.put('/email_templates/:id',updateemail_templates);


Route.get('/email_templatesBy',getemail_templatesBy);

Route.get('/email_templatesLike',getemail_templatesLike);

 Route.get('/email_templatesSearch',applyFilterSearchemail_templates);


 
// routes/routes.js



const {addfaqs,getfaqs,deletefaqs , updatefaqs,applyFilterSearchfaqs,getfaqsLike,getfaqsBy}= require('../controllers/faqs.js');
Route.get('/faqsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','faqs.html'));
});

Route.get('/faqs' , getfaqs);

Route.post('/faqs' ,addfaqs);

Route.delete('/faqs/:id',deletefaqs);

Route.put('/faqs/:id',updatefaqs);


Route.get('/faqsBy',getfaqsBy);

Route.get('/faqsLike',getfaqsLike);

 Route.get('/faqsSearch',applyFilterSearchfaqs);    


// routes/routes.js



const {addflightbookings,getflightbookings,deleteflightbookings , updateflightbookings,applyFilterSearchflightbookings,getflightbookingsLike,getflightbookingsBy}= require('../controllers/flightbookings.js'); 
Route.get('/flightbookingsPage',(req , res)=>{      
 res.sendFile(path.join(__dirname , '../views','flightbookings.html'));
});

Route.get('/flightbookings' , getflightbookings);   

Route.post('/flightbookings' ,addflightbookings);   

Route.delete('/flightbookings/:id',deleteflightbookings);

Route.put('/flightbookings/:id',updateflightbookings);


Route.get('/flightbookingsBy',getflightbookingsBy); 

Route.get('/flightbookingsLike',getflightbookingsLike);

 Route.get('/flightbookingsSearch',applyFilterSearchflightbookings);

// routes/routes.js



const {addflights,getflights,deleteflights , updateflights,applyFilterSearchflights,getflightsLike,getflightsBy}= require('../controllers/flights.js');     
Route.get('/flightsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','flights.html'));
});

Route.get('/flights' , getflights);

Route.post('/flights' ,addflights);

Route.delete('/flights/:id',deleteflights);

Route.put('/flights/:id',updateflights);


Route.get('/flightsBy',getflightsBy);

Route.get('/flightsLike',getflightsLike);

 Route.get('/flightsSearch',applyFilterSearchflights);


 // routes/routes.js



const {addhotelbookings,gethotelbookings,deletehotelbookings , updatehotelbookings,applyFilterSearchhotelbookings,gethotelbookingsLike,gethotelbookingsBy}= require('../controllers/hotelbookings.js');
Route.get('/hotelbookingsPage',(req , res)=>{       
 res.sendFile(path.join(__dirname , '../views','hotelbookings.html'));
});

Route.get('/hotelbookings' , gethotelbookings);     

Route.post('/hotelbookings' ,addhotelbookings);     

Route.delete('/hotelbookings/:id',deletehotelbookings);

Route.put('/hotelbookings/:id',updatehotelbookings);


Route.get('/hotelbookingsBy',gethotelbookingsBy);   

Route.get('/hotelbookingsLike',gethotelbookingsLike);

 Route.get('/hotelbookingsSearch',applyFilterSearchhotelbookings);

 const {addhotels,gethotels,deletehotels , updatehotels,applyFilterSearchhotels,gethotelsLike,gethotelsBy}= require('../controllers/hotels.js');
 Route.get('/hotelsPage',(req , res)=>{
  res.sendFile(path.join(__dirname , '../views','hotels.html'));
 });
 
 Route.get('/hotels' , gethotels);
 
 Route.post('/hotels' ,addhotels);
 
 Route.delete('/hotels/:id',deletehotels);
 
 Route.put('/hotels/:id',updatehotels);
 
 
 Route.get('/hotelsBy',gethotelsBy);
 
 Route.get('/hotelsLike',gethotelsLike);
 
  Route.get('/hotelsSearch',applyFilterSearchhotels);

// routes/routes.js



const {additineraries,getitineraries,deleteitineraries , updateitineraries,applyFilterSearchitineraries,getitinerariesLike,getitinerariesBy}= require('../controllers/itineraries.js');
Route.get('/itinerariesPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','itineraries.html'));
});

Route.get('/itineraries' , getitineraries);

Route.post('/itineraries' ,additineraries);

Route.delete('/itineraries/:id',deleteitineraries); 

Route.put('/itineraries/:id',updateitineraries);    


Route.get('/itinerariesBy',getitinerariesBy);       

Route.get('/itinerariesLike',getitinerariesLike);   

 Route.get('/itinerariesSearch',applyFilterSearchitineraries);

 
// routes/routes.js



const {additinerary_places,getitinerary_places,deleteitinerary_places , updateitinerary_places,applyFilterSearchitinerary_places,getitinerary_placesLike,getitinerary_placesBy}= require('../controllers/itinerary_places.js');
Route.get('/itinerary_placesPage',(req , res)=>{    
 res.sendFile(path.join(__dirname , '../views','itinerary_places.html'));
});

Route.get('/itinerary_places' , getitinerary_places);

Route.post('/itinerary_places' ,additinerary_places);

Route.delete('/itinerary_places/:id',deleteitinerary_places);

Route.put('/itinerary_places/:id',updateitinerary_places);


Route.get('/itinerary_placesBy',getitinerary_placesBy);

Route.get('/itinerary_placesLike',getitinerary_placesLike);

 Route.get('/itinerary_placesSearch',applyFilterSearchitinerary_places);

// routes/routes.js



const {addlanguages,getlanguages,deletelanguages , updatelanguages,applyFilterSearchlanguages,getlanguagesLike,getlanguagesBy}= require('../controllers/languages.js');
Route.get('/languagesPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','languages.html'));
});

Route.get('/languages' , getlanguages);

Route.post('/languages' ,addlanguages);

Route.delete('/languages/:id',deletelanguages);     

Route.put('/languages/:id',updatelanguages);        


Route.get('/languagesBy',getlanguagesBy);

Route.get('/languagesLike',getlanguagesLike);       

 Route.get('/languagesSearch',applyFilterSearchlanguages);

// routes/routes.js



const {addnotifications,getnotifications,deletenotifications , updatenotifications,applyFilterSearchnotifications,getnotificationsLike,getnotificationsBy}= require('../controllers/notifications.js');
Route.get('/notificationsPage',(req , res)=>{       
 res.sendFile(path.join(__dirname , '../views','notifications.html'));
});

Route.get('/notifications' , getnotifications);     

Route.post('/notifications' ,addnotifications);     

Route.delete('/notifications/:id',deletenotifications);

Route.put('/notifications/:id',updatenotifications);


Route.get('/notificationsBy',getnotificationsBy);   

Route.get('/notificationsLike',getnotificationsLike);

 Route.get('/notificationsSearch',applyFilterSearchnotifications);


// routes/routes.js



const {addpayment_gateway_fees,getpayment_gateway_fees,deletepayment_gateway_fees , updatepayment_gateway_fees,applyFilterSearchpayment_gateway_fees,getpayment_gateway_feesLike,getpayment_gateway_feesBy}= require('../controllers/payment_gateway_fees.js');     
Route.get('/payment_gateway_feesPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','payment_gateway_fees.html'));
});

Route.get('/payment_gateway_fees' , getpayment_gateway_fees);

Route.post('/payment_gateway_fees' ,addpayment_gateway_fees);

Route.delete('/payment_gateway_fees/:id',deletepayment_gateway_fees);

Route.put('/payment_gateway_fees/:id',updatepayment_gateway_fees);


Route.get('/payment_gateway_feesBy',getpayment_gateway_feesBy);

Route.get('/payment_gateway_feesLike',getpayment_gateway_feesLike);

 Route.get('/payment_gateway_feesSearch',applyFilterSearchpayment_gateway_fees);

// routes/routes.js



const {addpayment_gateway_transactions,getpayment_gateway_transactions,deletepayment_gateway_transactions , updatepayment_gateway_transactions,applyFilterSearchpayment_gateway_transactions,getpayment_gateway_transactionsLike,getpayment_gateway_transactionsBy}= require('../controllers/payment_gateway_transactions.js');
Route.get('/payment_gateway_transactionsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','payment_gateway_transactions.html'));
});

Route.get('/payment_gateway_transactions' , getpayment_gateway_transactions);

Route.post('/payment_gateway_transactions' ,addpayment_gateway_transactions);

Route.delete('/payment_gateway_transactions/:id',deletepayment_gateway_transactions);

Route.put('/payment_gateway_transactions/:id',updatepayment_gateway_transactions);


Route.get('/payment_gateway_transactionsBy',getpayment_gateway_transactionsBy);

Route.get('/payment_gateway_transactionsLike',getpayment_gateway_transactionsLike);

 Route.get('/payment_gateway_transactionsSearch',applyFilterSearchpayment_gateway_transactions);

// routes/routes.js



const {addpayments,getpayments,deletepayments , updatepayments,applyFilterSearchpayments,getpaymentsLike,getpaymentsBy}= require('../controllers/payments.js');
Route.get('/paymentsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','payments.html'));
});

Route.get('/payments' , getpayments);

Route.post('/payments' ,addpayments);

Route.delete('/payments/:id',deletepayments);       

Route.put('/payments/:id',updatepayments);


Route.get('/paymentsBy',getpaymentsBy);

Route.get('/paymentsLike',getpaymentsLike);

 Route.get('/paymentsSearch',applyFilterSearchpayments);

 // routes/routes.js



 const {addpromotions,getpromotions,deletepromotions , updatepromotions,applyFilterSearchpromotions,getpromotionsLike,getpromotionsBy}= require('../controllers/promotions.js');
 Route.get('/promotionsPage',(req , res)=>{
  res.sendFile(path.join(__dirname , '../views','promotions.html'));
 });
 
 Route.get('/promotions' , getpromotions);
 
 Route.post('/promotions' ,addpromotions);
 
 Route.delete('/promotions/:id',deletepromotions);   
 
 Route.put('/promotions/:id',updatepromotions);      
 
 
 Route.get('/promotionsBy',getpromotionsBy);
 
 Route.get('/promotionsLike',getpromotionsLike);     
 
  Route.get('/promotionsSearch',applyFilterSearchpromotions);

// routes/routes.js



const {addrefunds,getrefunds,deleterefunds , updaterefunds,applyFilterSearchrefunds,getrefundsLike,getrefundsBy}= require('../controllers/refunds.js');     
Route.get('/refundsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','refunds.html'));
});

Route.get('/refunds' , getrefunds);

Route.post('/refunds' ,addrefunds);

Route.delete('/refunds/:id',deleterefunds);

Route.put('/refunds/:id',updaterefunds);


Route.get('/refundsBy',getrefundsBy);

Route.get('/refundsLike',getrefundsLike);

 Route.get('/refundsSearch',applyFilterSearchrefunds);

// routes/routes.js



const {addreviews,getreviews,deletereviews , updatereviews,applyFilterSearchreviews,getreviewsLike,getreviewsBy}= require('../controllers/reviews.js');     
Route.get('/reviewsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','reviews.html'));
});

Route.get('/reviews' , getreviews);

Route.post('/reviews' ,addreviews);

Route.delete('/reviews/:id',deletereviews);

Route.put('/reviews/:id',updatereviews);


Route.get('/reviewsBy',getreviewsBy);

Route.get('/reviewsLike',getreviewsLike);

 Route.get('/reviewsSearch',applyFilterSearchreviews);

// routes/routes.js



const {addsocial_media_accounts,getsocial_media_accounts,deletesocial_media_accounts , updatesocial_media_accounts,applyFilterSearchsocial_media_accounts,getsocial_media_accountsLike,getsocial_media_accountsBy}= require('../controllers/social_media_accounts.js');
Route.get('/social_media_accountsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','social_media_accounts.html'));
});

Route.get('/social_media_accounts' , getsocial_media_accounts);

Route.post('/social_media_accounts' ,addsocial_media_accounts);

Route.delete('/social_media_accounts/:id',deletesocial_media_accounts);

Route.put('/social_media_accounts/:id',updatesocial_media_accounts);


Route.get('/social_media_accountsBy',getsocial_media_accountsBy);

Route.get('/social_media_accountsLike',getsocial_media_accountsLike);

 Route.get('/social_media_accountsSearch',applyFilterSearchsocial_media_accounts);

// routes/routes.js



const {addtrainbookings,gettrainbookings,deletetrainbookings , updatetrainbookings,applyFilterSearchtrainbookings,gettrainbookingsLike,gettrainbookingsBy}= require('../controllers/trainbookings.js');
Route.get('/trainbookingsPage',(req , res)=>{       
 res.sendFile(path.join(__dirname , '../views','trainbookings.html'));
});

Route.get('/trainbookings' , gettrainbookings);     

Route.post('/trainbookings' ,addtrainbookings);     

Route.delete('/trainbookings/:id',deletetrainbookings);

Route.put('/trainbookings/:id',updatetrainbookings);


Route.get('/trainbookingsBy',gettrainbookingsBy);   

Route.get('/trainbookingsLike',gettrainbookingsLike);

 Route.get('/trainbookingsSearch',applyFilterSearchtrainbookings);

// routes/routes.js



const {addtrains,gettrains,deletetrains , updatetrains,applyFilterSearchtrains,gettrainsLike,gettrainsBy}= require('../controllers/trains.js');
Route.get('/trainsPage',(req , res)=>{
 res.sendFile(path.join(__dirname , '../views','trains.html'));
});

Route.get('/trains' , gettrains);

Route.post('/trains' ,addtrains);

Route.delete('/trains/:id',deletetrains);

Route.put('/trains/:id',updatetrains);


Route.get('/trainsBy',gettrainsBy);

Route.get('/trainsLike',gettrainsLike);

 Route.get('/trainsSearch',applyFilterSearchtrains);

// routes/routes.js



const {addtravel_curators,gettravel_curators,deletetravel_curators , updatetravel_curators,applyFilterSearchtravel_curators,gettravel_curatorsLike,gettravel_curatorsBy}= require('../controllers/travel_curators.js');
Route.get('/travel_curatorsPage',(req , res)=>{     
 res.sendFile(path.join(__dirname , '../views','travel_curators.html'));
});

Route.get('/travel_curators' , gettravel_curators); 

Route.post('/travel_curators' ,addtravel_curators); 

Route.delete('/travel_curators/:id',deletetravel_curators);

Route.put('/travel_curators/:id',updatetravel_curators);


Route.get('/travel_curatorsBy',gettravel_curatorsBy);

Route.get('/travel_curatorsLike',gettravel_curatorsLike);

 Route.get('/travel_curatorsSearch',applyFilterSearchtravel_curators);

Route.get('/restaurant', (req , res) => {
    res.sendFile(path.join(__dirname , '../views','restaurant.html'));
});

module.exports =Route;


