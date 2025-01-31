import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

const CustomModal = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        p='8'
        maxW={{ base: '90%', md: '500px' }}
        m={{ base: '1rem', md: '0' }}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Must be a boolean
  onClose: PropTypes.func.isRequired, // Must be a function
  title: PropTypes.string.isRequired, // Must be a string
  children: PropTypes.node.isRequired, // Can be any valid React node
};

export default CustomModal;
