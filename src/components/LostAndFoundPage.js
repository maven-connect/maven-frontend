import {
  contactLostandFoundThunk,
  createLostandFound,
  fetchLostandFound,
  removeLostandFound,
  selectLostAndFound,
} from "@/features/lostAndFoundSlice";
import {
  Button,
  FileInput,
  Modal,
  NativeSelect,
  TextInput,
  rem,
  Card,
  Text,
  SegmentedControl,
  Center,
  Flex,
  Badge,
  Group,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconPlus, IconUpload } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormatedTime from "./UI/FormatedTime";
import { selectProfile } from "@/features/profileSlice";
import { Toaster, toast } from "react-hot-toast";

function LostAndFoundPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [deleteModal2Opened, setDeleteModal2Opened] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { data: LostAndFoundData, status } = useSelector(selectLostAndFound);
  const { data: profileData } = useSelector(selectProfile);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("LOST");
  const [viewOptions, setViewOptions] = useState("LOST");
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

  useEffect(() => {
    dispatch(fetchLostandFound());
  }, []);

  // console.log(LostAndFoundData.LostData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createLostandFound({ itemName, description, imageFile, selectedOption })
    );
    setItemName("");
    setDescription("");
    setImageFile(null);
    setSelectedOption("LOST");
    close();
  };
  const handleDeleteItemClick = (item) => {
    const id = item.id;
    dispatch(removeLostandFound(id));
    setDeleteModalOpened(false);
    setDeleteModal2Opened(false);
    setDetailsModalOpened(false);
  };
  const handleItemInfoClick = (item) => {
    setSelectedItem(item);
    setDetailsModalOpened(true); // Open details modal
  };

  const handleContactClick = (item) => {
    dispatch(contactLostandFoundThunk(item)).then((res) => {
      if (res.payload) {
        toast.success("Successfully Contacted !!!");
      }
    });
  };

  const ItemCard = ({ item }) => {
    const isCurrentUserItem = item.user === profileData.email;
    return (
      <Card withBorder shadow="xs" padding="md" pt={2}>
        <Group position="apart">
          <Badge mt={10} mb={10}>
            {item.user}
          </Badge>
          <IconInfoCircle onClick={() => handleItemInfoClick(item)} />
        </Group>
        <Center>
          <img
            src={BASE_URL + item.image}
            height={200}
            width={200}
            alt={item.name}
          />
        </Center>
        <Text size="xl">{item.name}</Text>
        <Text>
          <FormatedTime>{item.timestamp}</FormatedTime>
        </Text>

        {isCurrentUserItem && (
          <>
            <Modal
              opened={deleteModalOpened}
              onClose={() => setDeleteModalOpened(false)}
              title="Do you want to delete the item ?"
              centered
            >
              <Group>
                <Button onClick={() => handleDeleteItemClick(item)}>Yes</Button>
                <Button
                  variant="light"
                  color="red"
                  onClick={() => setDeleteModalOpened(false)}
                >
                  Cancle
                </Button>
              </Group>
            </Modal>
            <Button
              onClick={() => setDeleteModalOpened(true)} // Implement your delete logic here
              variant="outline"
              color="red"
              size="xs"
              style={{ marginLeft: "auto" }}
            >
              Delete
            </Button>
          </>
        )}

        {!isCurrentUserItem && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleContactClick(item)}
          >
            Contact
          </Button>
        )}
      </Card>
    );
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <Center>
        <SegmentedControl
          data={["LOST", "FOUND"]}
          value={viewOptions}
          onChange={(value) => setViewOptions(value)}
        />
      </Center>
      <br />
      <Button onClick={open}>
        <IconPlus />
        Add Lost or Found Item
      </Button>

      <Modal
        opened={detailsModalOpened}
        onClose={() => setDetailsModalOpened(false)}
        title="Item Details"
        size={"xl"}
      >
        {selectedItem && (
          <div style={{ padding: "20px" }}>
            <Text size="xl" align="center" style={{ marginBottom: "5px" }}>
              Item: {selectedItem.name}
            </Text>
            <Group mb={15} align="center">
              <Text>Posted by :</Text>
              <Badge>{selectedItem.user}</Badge>
            </Group>
            <Text size="sm" color="gray" my={10}>
              Description: {selectedItem.description}
            </Text>
            {selectedItem.image ? (
              <img
                src={BASE_URL + selectedItem.image}
                height={200}
                alt={selectedItem.name}
                style={{ marginTop: "20px" }}
              />
            ) : (
              <Text size={"xl"} color="red">
                No Image
              </Text>
            )}
            <Text size="sm" color="gray" style={{ marginTop: "20px" }}>
              Time: <FormatedTime>{selectedItem.timestamp}</FormatedTime>
            </Text>
            {/* Add any other details you want to display */}
            <Text my={10} fs={"lg"}>
              Contacted List
            </Text>
            {selectedItem.contacts &&
              selectedItem.contacts.map((el) => (
                <Paper withBorder shadow="md">
                  <Group position="apart" p={10}>
                    <Text>{el.email}</Text>
                    <Text>{el.branch}</Text>
                    <Text>{el.batch}</Text>
                  </Group>
                </Paper>
              ))}

            {selectedItem?.user === profileData?.email && (
              <>
                <Modal
                  opened={deleteModal2Opened}
                  onClose={() => setDeleteModal2Opened(false)}
                  title="Do you want to delete the item ?"
                >
                  <Group>
                    <Button onClick={() => handleDeleteItemClick(selectedItem)}>
                      Yes
                    </Button>
                    <Button
                      variant="light"
                      color="red"
                      onClick={() => setDeleteModal2Opened(false)}
                    >
                      Cancle
                    </Button>
                  </Group>
                </Modal>
                <Button
                  onClick={() => setDeleteModal2Opened(true)} // Implement your delete logic here
                  variant="outline"
                  color="red"
                  style={{ marginTop: "20px" }}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        )}
      </Modal>
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
            data={["LOST", "FOUND"]}
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
      <Flex gap={10} mt={10} wrap="wrap">
        {LostAndFoundData.LostData &&
          (viewOptions === "LOST"
            ? LostAndFoundData.LostData.map((item, index) => (
                <ItemCard key={index} item={item} />
              ))
            : LostAndFoundData.FoundData.map((item, index) => (
                <ItemCard key={index} item={item} />
              )))}
      </Flex>
    </>
  );
}

export default LostAndFoundPage;
