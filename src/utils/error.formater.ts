export function formatErrors(errors: any[], parent = '') {
   const result = [];

   for (const err of errors) {
      const isIndex = !isNaN(Number(err.property));

      const fieldPath = parent
         ? isIndex
            ? `${parent}[${err.property}]`
            : `${parent}.${err.property}`
         : err.property;

      if (err.constraints) {
         result.push({
            field: fieldPath,
            errors: Object.values(err.constraints),
         });
      }

      if (err.children && err.children.length > 0) {
         result.push(...formatErrors(err.children, fieldPath));
      }
   }

   return result;
}
