import { api } from "../api";

export default async () => {
  // Get all fields
  // Get all required fields - meta.required ===true
  // update all these fields to optional
  const fields = await api.get<{ data: any[] }>("/fields");
  const requireFields = fields.data.data
    .filter((i) => i.meta.required)
    .map((i) => {
      return {
        collection: i.collection as string,
        name: i.field as string,
      };
    });
  requireFields.forEach(async (field) => {
    await makeFieldOptional(field.collection, field.name);
  });
};

const makeFieldOptional = async (collection: string, fieldName: string) => {
  console.log(`Making /${collection}/${fieldName} optional.`);
  await api.patch(`/fields/${collection}/${fieldName}`, {
    meta: {
      required: false,
    },
  });
};
