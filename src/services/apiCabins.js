import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("There was an error loading cabins.");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create / edit cabin
  let query = supabase.from("cabins");

  //Create:
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // .select()
  // .single();
  //select and single are needed in case u want to return newly created obj

  // Edit:
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  // .select();

  const { data, error } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(`Cabin could not be added.`);
  }

  //uploading image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(`Cabin image could not be uploaded.`);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error(`Cabin with id ${id} could not be deleted.`);
  }

  return data;
}
export default getCabins;
