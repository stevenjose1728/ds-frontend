import React, { useState } from 'react';
import { Post } from '../models';
import { ClassicEditor, Bold, Essentials, Italic, Paragraph, Undo, Image, ImageToolbar, ImageInsert, MediaEmbed, Base64UploadAdapter } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '../styles/postModal.css'

import 'ckeditor5/ckeditor5.css';
import { Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../reducers/store';
import { createContent } from '../reducers/postSlice';

type Props = {
  onClose: () => void;
  topic: Post | null;
};

function AddContentModal(props: Props) {
  const [content, setContent] = useState<string>("<p>Type here...</p>");
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const customToolbar = [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    props.topic?.allowImage ? 'imageUpload' : '',
    props.topic?.allowVideo ? 'mediaEmbed' : '',
    '|',
    'undo',
    'redo',
  ].filter(Boolean);
  const handleSubmit = async () => {
    if (content && token && props.topic) {
      await dispatch(createContent({
        data: { content, topic: props.topic._id },
        token
      }))
      props.onClose();
    }
  }
  return (
    <div className='post-modal'>
      <h2>Add Content</h2>
      <CKEditor
        editor={ClassicEditor}
        config={{
          plugins: [
            Essentials,
            Bold,
            Italic,
            Paragraph,
            Image,
            ImageToolbar,
            ImageInsert,
            MediaEmbed,
            Undo,
            Base64UploadAdapter
          ],
          toolbar: customToolbar,
          image: {
            toolbar: ['imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:side']
          }
        }}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data)
        }}
        disabled={!props.topic?.allowText}
      />
      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={props.onClose}>
          Close
        </Button>
      </Stack>
    </div>
  );
}

export default AddContentModal;
