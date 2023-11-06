import { Controller, UseFormReturn } from "react-hook-form";
import { TextField, Box } from "@mui/material";

interface Props {
  methods: UseFormReturn;
  name: string;
  type: React.HTMLInputTypeAttribute;
  watchName: string;
}

export default function Input({ methods, name, type, watchName }: Props) {
  const { control, watch } = methods;
  const watchedValue = watch(watchName);

  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            variant="filled"
            {...field}
            error={!!error}
            type={type}
            value={watchedValue}
            placeholder={name}
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
