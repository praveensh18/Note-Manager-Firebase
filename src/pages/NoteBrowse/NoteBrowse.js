import React, { useState } from 'react';
import NoteList from 'containers/NoteList/NoteList';
import TextCard from 'components/TextCard/TextCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from 'components/SearchBar/SearchBar';

const NoteBrowse = () => {
  const noteList = useSelector((state) => state.noteSlice.noteList);
  const [searchTerm, setSearchTerm] = useState('');

  // Helper function to execute basic filter for given text
  const searchFilter = (text) => {
    return text.trim().toUpperCase().includes(searchTerm.trim().toUpperCase())
  }

  const filterNote = (note) => {
    const containsTitle = searchFilter(note.title)
    const containsContent = searchFilter(note.content)
    return containsTitle || containsContent;
  }

  // Filtering note list according to search term
  const filteredNoteList = noteList.filter((note) => filterNote(note))
  
  return (
    <div>
      <div className='row justify-content-center mb-5'>
        <div className='col-sm-12 col-md-6'>
      <SearchBar onTextChange={setSearchTerm} placeholder={'Search your notes...'}/>
      </div>
      </div>
      {noteList?.length === 0 && (
        <div className='d-flex justify-content-center'>
          <span>
          You don't have any note, you can create new note{' '}
          <Link to={'/note/new'}>here</Link>
          </span>
        </div>
      )}
      <NoteList noteList={filteredNoteList}/>
    </div>
  );
};

export default NoteBrowse;


