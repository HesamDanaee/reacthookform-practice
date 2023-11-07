// Global Imports
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
// Material UI
import { Stack, Typography, Button } from "@mui/material";

// form schema
import formSchema from "../configs/formValidation";

// Components
import Input from "../components/Input";

// Constants
import { rooms } from "../constants/mockData";

export type IForm = {
  name: string;
  lastName: string;
  naCode: number;
  passengers: Passenger[][];
};

type Passenger = {
  name: string;
  lastName: string;
  naCode: number;
};

export default function Form() {
  const methods = useForm({
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitHandler = (data: any) => {
    !!data && console.log(data);
    !data && console.log("Validate your form");
  };

  console.log(errors);

  const mapedRoom = rooms.map((room) => {
    const { capacity, inputs, data } = room;

    const roomCount = new Array(capacity).fill({});

    const content = roomCount.map((_) => (
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        my={"20px"}
        key={uuid()}
      >
        {inputs.map(({ name, type }, index) => (
          <Input
            type={type}
            name={`passengers.${index}.${name}`}
            placeHolder={name}
            key={uuid()}
          />
        ))}
      </Stack>
    ));

    return (
      <Stack px={20} key={uuid()}>
        <Typography alignSelf={"end"}>{data}</Typography>
        <Stack direction={"column"}>{content}</Stack>
      </Stack>
    );
  });

  return (
    <FormProvider {...methods}>
      <Stack
        height={"auto"}
        bgcolor={"gray"}
        alignContent={"center"}
        component={"form"}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Stack justifyContent={"column"} px={10}>
          <Typography>Main Passenger</Typography>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Input placeHolder="name" name="name" type="text" />
            <Input placeHolder="lastName" name="lastName" type="text" />
            <Input placeHolder="mobile" name="mobile" type="number" />
            <Input placeHolder="email" name="email" type="text" />
          </Stack>
        </Stack>
        <Stack direction={"column"}>{mapedRoom}</Stack>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </FormProvider>
  );
}
