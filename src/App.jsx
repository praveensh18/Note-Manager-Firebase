import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NoteAPI } from 'api/note-api';
import { setNoteList } from './store/notes/note-slice';
import { withAuthRequired } from 'hoc/withAuthRequired';
import ButtonPrimary from 'components/ButtonPrimary/ButtonPrimary';
import s from './style.module.css'

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAllNotes = async () => {
    const noteList = await NoteAPI.fetchAllNotes();
    dispatch(setNoteList(noteList));
  };

  useEffect(() => {
    const unsub = NoteAPI.onShouldSyncNotes(fetchAllNotes)
    return () => {
      unsub();
    }
  }, []);

  return (
    <div>
      <Header />
      <ButtonPrimary className={s.addNote_button} onBtnClick={() => navigate('/note/new')}>
          +
      </ButtonPrimary>
      <div className='workspace'>
      <Outlet />
      </div>
    </div>
  );
}

export const ProtectedApp = withAuthRequired(App)
