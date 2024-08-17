import React from 'react';
import NoteForm from 'components/NoteForm/NoteForm';
import { NoteAPI } from 'api/note-api';
import { useDispatch } from 'react-redux';
import { addNote } from 'store/notes/note-slice';
import { useNavigate } from 'react-router-dom';

const NoteCreate = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
  const submit = async (formValues) => {
    const createdNote = await NoteAPI.createNote({
      ...formValues,
      created_at: new Date().toLocaleDateString(),
    });
    alert('Note has been created');
		dispatch(addNote(createdNote))
		navigate('/')
  };
  return (
    <div>
      <NoteForm title={'New Note'} onSubmitBtn={submit} />
    </div>
  );
};

export default NoteCreate;
