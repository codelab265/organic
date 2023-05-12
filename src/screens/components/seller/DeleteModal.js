import React from "react";
import { AlertDialog, Button, Center, Text } from "native-base";
import { useState } from "react";

const DeleteModal = ({ onClose, Open, Delete, Loading }) => {
  const cancelRef = React.useRef(null);
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={Open}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete</AlertDialog.Header>
          <AlertDialog.Body>
            <Text fontFamily={'Poppins_500Medium'} fontSize={'lg'}>Are you sure you want to delete?</Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button
                colorScheme="danger"
                onPress={Delete}
                isDisabled={Loading}
                isLoading={Loading}
                isLoadingText={"Deleting..."}
              >
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default DeleteModal;
