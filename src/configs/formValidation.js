import { object, string, number, array } from "yup";

const formSchema = object().shape({
  name: string().required(),
  lastName: string().required(),
  mobile: number().required(),
  email: string().email().optional(),
  passengers: array()
    .of(
      array().test("index", "check index", (arr, detail) => {
        const arrayAndNotEmpty = Array.isArray(arr) && arr.length > 0;

        if (arrayAndNotEmpty) {
          for (let x = 0; x < arr.length; ++x) {
            const { name, lastName, na_code } = arr[x];

            if (x === 0) {
              if (string().required().isValidSync(name)) {
                return this.createError({
                  path: `${detail.path}[0].lastName`,
                  message: "فیلد نام الزامی می باشید",
                });
              }
            }
          }
        }
      })
    )
    .required(),
});

// const formSchema = object().shape({
//   name: string().required(),
//   lastName: string().required(),
//   mobile: number().required(),
//   email: string().email().optional(),
//   passengers: array()
//     .required()
//     .of(
//       array()
//         .min(1)
//         .of(
//           object()
//             .shape({
//               name: string().required(),
//               lastName: string().required(),
//               na_code: number().required(),
//             })
//             .test(
//               "firstElementRequired",
//               "First element is required",
//               (value, context) => {
//                 if (context.parent && Array.isArray(context.parent)) {
//                   const index = context.parent.indexOf(value);
//                   if (index === 0) alert(index);
//                   return index === 0 || index === -1;
//                 }
//                 return true;
//               }
//             )
//         )
//     ),
// });
export default formSchema;
