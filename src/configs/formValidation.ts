import { object, string, number, array } from "yup";

const mainPassengerSchema = object().shape({
  name: string().required(),
  lastName: string().required(),
  naCode: number().required(),
  mobile: number().required(),
  email: string().email("فرمت ایمیل درست نیست.").optional(),
});

const passengerSchema = object({
  name: string().required(),
  lastName: string().required(),
  naCode: number().required(),
});

const passengersArraySchema = array().of(passengerSchema);

const formSchema = object().shape({
  name: string().required(),
  lastName: string().required(),
  naCode: number().required(),
  passengers: array(),
});

export default formSchema;
