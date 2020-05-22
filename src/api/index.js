import axios from 'axios';

const covidApiUrlSummary = 'https://api.covid19api.com/summary';
const covidApiUrlDayoneCountry = 'https://api.covid19api.com/total/dayone/country/'

export const fetchSummaryCovidData = async () => {
    try {
        const { data } = await axios.get(covidApiUrlSummary);
        return {
            "NewConfirmed": data.Global.NewConfirmed,
            "TotalConfirmed": data.Global.TotalConfirmed,
            "NewDeaths": data.Global.NewDeaths,
            "TotalDeaths": data.Global.TotalDeaths,
            "NewRecovered": data.Global.NewRecovered,
            "TotalRecovered": data.Global.TotalRecovered,
            "CountriesData": data.Countries
        };      
    } catch (error) {
        return {
            error: "Cannot obtain the data."
        }
    }
};

export const fetchDayOneForCountryCovidData = async (country) => {
    try {
        const data= await axios.get(`${covidApiUrlDayoneCountry}${country}`);
        return data;   
    } catch (error) {
        return {
            error: "Cannot obtain the data."
        }
    }
};