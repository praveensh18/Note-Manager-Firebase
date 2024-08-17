import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { FirebaseApp } from 'utils/firebase';

export class NoteAPI {
  static async fetchAllNotes() {
    const q = query(
      collection(FirebaseApp.db, 'notes'),
      orderBy('created_at', 'asc')
    );
    const response = await getDocs(q);
    return response.docs.map((document) => {
      return {
        ...document.data(),
        id: document.id,
      };
    });
  }

  static async createNote(formValues) {
    const response = await addDoc(
      collection(FirebaseApp.db, 'notes'),
      formValues
    );
    return {
      id: response.id,
      ...formValues,
      created_at: new Date().toLocaleDateString(),
    };
  }

  static async deleteNote(noteId) {
    const reference = doc(FirebaseApp.db, 'notes', noteId)
    await deleteDoc(reference)
  }

  static async updateNoteById(noteId, formValues) {
    const reference = doc(FirebaseApp.db, 'notes', noteId)
    await updateDoc(reference, formValues)
    return {
      id: noteId,
      ...formValues,
      created_at: new Date().toLocaleDateString(),
    }
  }

  // Real Time Update using onSnapshot
  static onShouldSyncNotes(onChangeFunc) {
    const q = query(collection(FirebaseApp.db, 'notes'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;
      if(!isUserPerformingChange) {
      // console.log('You are not synced')
      onChangeFunc();
    }
    })
    return unsub;
  }
}
