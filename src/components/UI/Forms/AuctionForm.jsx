import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
} from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { FiPlusCircle } from 'react-icons/fi';

const AuctionForm = ({ onSubmit, auctionData, onDelete }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      media: [],
      endsAt: '',
    },
  });

  const [mediaInput, setMediaInput] = useState('');
  const [mediaUrls, setMediaUrls] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const isValidImageUrl = (url) => {
    return (
      /\.(jpeg|jpg|gif|png|webp)$/i.test(url) ||
      /(pexels|unsplash|images\.com|cdn)\.com/i.test(url)
    );
  };

  const handleAddMedia = () => {
    if (mediaInput && isValidImageUrl(mediaInput)) {
      setMediaUrls([...mediaUrls, mediaInput]);
      setMediaInput('');
    } else {
      alert('Please enter a valid image URL');
    }
  };

  useEffect(() => {
    if (auctionData) {
      setValue('title', auctionData.title);
      setValue('description', auctionData.description);
      setMediaUrls(auctionData.media?.map((item) => item.url) || []);

      const formattedEndsAt = auctionData.endsAt
        ? new Date(auctionData.endsAt).toISOString().slice(0, 16)
        : '';
      setValue('endsAt', formattedEndsAt);
    } else {
      reset();
    }
  }, [auctionData, setValue, reset]);

  return (
    <Box
      as='form'
      onSubmit={handleSubmit((formData) => {
        // Ensure media is correctly formatted as an array of objects
        const formattedMedia = mediaUrls.map((url) => ({
          url,
          alt: formData.title || 'Auction image',
        }));

        onSubmit({
          id: auctionData?.id || null,
          title: formData.title,
          description: formData.description,
          media: formattedMedia,
          tags,
          endsAt: formData.endsAt,
        });
      })}
      p='4'
    >
      {/* Title */}
      <FormControl isInvalid={errors.title}>
        <FormLabel>Title</FormLabel>
        <Input {...register('title', { required: 'Title is required' })} />
      </FormControl>

      {/* Description */}
      <FormControl isInvalid={errors.description} mt='4'>
        <FormLabel>Description</FormLabel>
        <Textarea
          {...register('description', { required: 'Description is required' })}
        />
      </FormControl>

      {/* Deadline Date */}
      <FormControl mt='4' isInvalid={errors.endsAt}>
        <FormLabel>Deadline</FormLabel>
        <Input
          type='datetime-local'
          {...register('endsAt', { required: 'Please select a deadline' })}
        />
      </FormControl>

      {/* Media Gallery */}
      <FormControl mt='4'>
        <FormLabel>Media Gallery</FormLabel>
        <Flex>
          <Input
            placeholder='Add image URL...'
            value={mediaInput}
            onChange={(e) => setMediaInput(e.target.value)}
          />
          <IconButton ml='2' icon={<FiPlusCircle />} onClick={handleAddMedia} />
        </Flex>
      </FormControl>
      <Flex wrap='wrap' mt='2'>
        {mediaUrls.map((url, index) => (
          <Tag key={index} mr='2' mt='2'>
            <TagLabel>{url}</TagLabel>
            <TagCloseButton
              onClick={() =>
                setMediaUrls(mediaUrls.filter((_, i) => i !== index))
              }
            />
          </Tag>
        ))}
      </Flex>

      {/* Tags */}
      <FormControl mt='4'>
        <FormLabel>Tags</FormLabel>
        <Flex>
          <Input
            placeholder='Add a tag...'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <IconButton
            ml='2'
            icon={<FiPlusCircle />}
            onClick={() => {
              if (tagInput) {
                setTags([...tags, tagInput]);
                setTagInput('');
              }
            }}
          />
        </Flex>
      </FormControl>
      <Flex wrap='wrap' mt='2'>
        {tags.map((tag, index) => (
          <Tag key={index} mr='2' mt='2'>
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton
              onClick={() => setTags(tags.filter((_, i) => i !== index))}
            />
          </Tag>
        ))}
      </Flex>

      {/* Submit Button */}
      <Button type='submit' bg='brand.600' color='white' mt='4' w='full'>
        {auctionData ? 'Update Auction' : 'Create Auction'}
      </Button>
      {auctionData ? (
        <Button w='full' mt='2' onClick={async () => onDelete()}>
          Delete
        </Button>
      ) : null}
    </Box>
  );
};

AuctionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  auctionData: PropTypes.object,
  onDelete: PropTypes.func,
};

export default AuctionForm;
