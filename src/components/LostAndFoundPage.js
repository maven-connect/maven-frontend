import { createLostandFound } from "@/features/lostAndFoundSlice";
import {
  Button,
  FileInput,
  Modal,
  NativeSelect,
  TextInput,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconUpload } from "@tabler/icons-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function LostAndFoundPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  // States for form fields
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Lost");

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();

  //   // Do something with the form data (itemName, description, imageFile, selectedOption)
  //   console.log("Item Name:", itemName);
  //   console.log("Description:", description);
  //   console.log("Image File:", imageFile);
  //   console.log("Selected Option:", selectedOption);

  //   // Close the modal after submitting
  //   close();
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("item_name", itemName);
    // formData.append("description", description);
    // formData.append("image", imageFile);
    // formData.append("status", selectedOption);
    // console.log(itemName, description, imageFile, selectedOption);
    dispatch(
      createLostandFound({ itemName, description, imageFile, selectedOption })
    );

    close();
  };

  return (
    <>
      <Button onClick={open}>
        <IconPlus />
        Add Lost or Found Item
      </Button>
      <Modal opened={opened} onClose={close} title="Lost or Found">
        <form onSubmit={handleFormSubmit}>
          <TextInput
            placeholder="Lost or Found Item Name"
            label="Lost or Found Item"
            withAsterisk
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextInput
            placeholder="Details of item lost or found"
            label="Description"
            withAsterisk
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FileInput
            placeholder="upload the image of item"
            label="Upload Image"
            icon={<IconUpload size={rem(14)} />}
            value={imageFile}
            onChange={setImageFile}
          />
          <NativeSelect
            data={["Lost", "Found"]}
            label="Select lost or Found"
            withAsterisk
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.currentTarget.value)}
          />
          <Button mt={10} type="submit">
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default LostAndFoundPage;
