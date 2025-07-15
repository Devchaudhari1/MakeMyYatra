const axios =require('axios');

const token = 'pk.eyJ1IjoiZGV2Y2hhdWRoYXJpIiwiYSI6ImNtOHB4NDE5ejA3YXIyanM4cmQzbmIyMGwifQ.xU-daOsHSMOzh3LNI7aM-g';


const searchPlace = async (req ,res)=>{
    const placeName = req.params.id;
    console.log("place name  is" , placeName);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(placeName)}.json`;
  
    try {
      const response = await axios.get(url, {
        params: {
          access_token: token
        }
      });
  
      const data = response.data;
            console.log(data.features);  // Array of results from the geocoding search
            return res.status(200).send(data);
    } catch (error) {
      console.error('Error with geocoding request:', error);
    }

};

module.exports ={searchPlace};