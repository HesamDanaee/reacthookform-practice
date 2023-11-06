// Global Imports
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

// Material UI
import { Grid, Stack, Box, Typography } from "@mui/material";

// form schema
import formSchema from "../configs/formValidation";

// Components
import Input from "../components/Input";

// Constants
import { rooms } from "../constants/mockData";

export default function Form() {
  const methods = useForm({
    defaultValues: {},
  });

  const mapedRoom = rooms.map((room) => {
    const { capacity, id, inputs, data } = room;

    const roomCount = new Array(capacity).fill({});

    const content = roomCount.map((_) => (
      <>
        {inputs.map(({ name, type }, index) => (
          <Input
            type={type}
            name={name}
            methods={methods}
            watchName={name}
            key={`input-${index}-${id}`}
          />
        ))}
      </>
    ));

    return (
      <Box>
        <Typography>{data}</Typography>
        <Stack direction={"row"}> {content}</Stack>
      </Box>
    );
  });

  return (
    <FormProvider {...methods}>
      <Stack bgcolor={"gray"}>
        <Box component={"form"}>
          {/* <Input methods={methods} name="name" type="text" watchName="name" /> */}
          <Stack direction={"column"}>{mapedRoom}</Stack>
        </Box>
      </Stack>
    </FormProvider>
  );
}
