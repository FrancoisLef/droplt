import { Transmission } from '@ctrl/transmission';

const {
  TRANSMISSION_PASSWORD,
  TRANSMISSION_URL = 'http://localhost:9091',
  TRANSMISSION_USER,
} = process.env;

const transmission = new Transmission({
  baseUrl: TRANSMISSION_URL,
  username: TRANSMISSION_USER,
  password: TRANSMISSION_PASSWORD,
});

export default transmission;
