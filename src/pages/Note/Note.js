import { NoteAPI } from 'api/note-api';
import NoteForm from 'components/NoteForm/NoteForm';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateNote, deleteNote } from 'store/notes/note-slice'

const Note = () => {
  const { noteId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteSlice.noteList);
  const note = noteList.find((note) => note.id === noteId);

  const [isEditable, setIsEditable] = useState(false);

  const submit = async (formValues) => {
    const updatedNote = await NoteAPI.updateNoteById(note.id, formValues);
		dispatch(updateNote(updatedNote));
		setIsEditable(false);
  };

	const removeNote = async () => {
		if(window.confirm('Delete note?')) {
		NoteAPI.deleteNoteById(note.id)
		dispatch(deleteNote(note));
		navigate('/')
		}
	}

  return (
    <div>
      {note && (
        <NoteForm
          title={isEditable ? 'Edit Note' : note.title}
          note={note}
          isEditable={isEditable}
          onClickEdit={() => setIsEditable(!isEditable)}
          onClickDelete={removeNote}
          onSubmitBtn={isEditable && submit}
        />
      )}
    </div>
  );
};

export default Note;
