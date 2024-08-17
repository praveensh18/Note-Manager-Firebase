import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from 'store/notes/note-slice';
import { useNavigate } from 'react-router-dom';
import TextCard from 'components/TextCard/TextCard';
import s from './style.module.css';
import { NoteAPI } from 'api/note-api';

const NoteList = ({noteList}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeNote = async (note) => {
    if (window.confirm('Delete Note?')) {
      NoteAPI.deleteNoteById(note.id);
      dispatch(deleteNote(note));
    }
  };

  return (
    <div className={`row justify-content-center`}>
      {noteList.map((note) => (
        <div key={note.id} className={s.card_container}>
          <TextCard
            key={note.id}
            title={note.title}
            subtitle={note.created_at}
            content={note.content}
            onClickCard={() => navigate(`/note/${note.id}`)}
            onClickTrash={() => removeNote(note)}
          />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
