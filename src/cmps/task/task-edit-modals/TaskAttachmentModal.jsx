import React, { useState } from 'react';
import { boardService } from '../../../services/board.service';
import { uploadService } from '../../../services/upload.service';

export function TaskAttachmentModal({ task, submitTaskEdit }) {
  const [fileName, setFileName] = useState('');
  const [linkAttachment, setLinkAttachment] = useState('');
  let updateTask = { ...task };

  function onAttachLink() {
    submitTaskEdit(updateTask);
  }

  async function onUploadImg(ev) {
    setFileName(ev.target.files[0].name);
    const url = await uploadService.uploadImg(ev);
    const newAttachment = boardService.getEmptyAttachment();

    newAttachment.url = url;
    newAttachment.title = ev.target.files[0].name;
    updateTask.attachments.push(newAttachment);
    onAttachLink();
  }

  const handleLinkAttachment = () => {
    if (linkAttachment.trim() !== '') {
      const newAttachment = boardService.getEmptyAttachment();
      newAttachment.url = linkAttachment;
      newAttachment.title = linkAttachment
        updateTask.attachments.push(newAttachment);
        onAttachLink();
    }
  };

  return (
    <section className='task-attachment'>
      <h3 className='dynamic-modal-title'>Attach</h3>
      <div className='task-attachment-add'>
        
        <h3 className='modal-sub-title'>Paste a link</h3>
        <input
          type='text'
          placeholder='Add a link attachment...'
          className='modal-search'
          onChange={(e) => setLinkAttachment(e.target.value)}
          value={linkAttachment}
        />
        <h3 className='modal-sub-title'>Attach a file from your computer</h3>
        <input
          type='file'
          id='myfile'
          accept='image/*'
          onChange={onUploadImg}
          className='task-attachment-file'
        />
        <label htmlFor='myfile' className='btn-edit'>
          Choose a file
        </label>
      </div>
      <span className='attachment-file-name'>{fileName}</span>
      <button className='btn-save' onClick={linkAttachment === '' ? onAttachLink : handleLinkAttachment}>
        Insert
      </button>
    </section>
  );
}
