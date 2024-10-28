import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';

interface PostProps {
  id: string;
  title: string;
  content: string;
  comments: string[];
  canEdit?: boolean;
}

const Post: React.FC<PostProps> = ({ id, title, content, comments, canEdit }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      {canEdit && (
        <CKEditor
          editor={ClassicEditor}
          data="<p>Edit content here...</p>"
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ data });
          }}
        />
      )}
      <div>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default Post;
