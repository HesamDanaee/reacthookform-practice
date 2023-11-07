import { Controller, useFormContext } from "react-hook-form";
import { TextField, Box } from "@mui/material";

interface Props {
  name: string;
  placeHolder?: string;
  type: React.HTMLInputTypeAttribute;
}

export default function Input({ name, type, placeHolder }: Props) {
  const { control } = useFormContext();

  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            variant="outlined"
            {...field}
            error={!!error}
            type={type}
            placeholder={placeHolder}
            sx={{
              ":hover": {
                cursor: "pointer",
              },
            }}
          />
        )}
      />
    </Box>
  );
}
