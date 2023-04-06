import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Add notes content to the datab');
  const notesDB = await openDB('jate', 1);
  const tx = notesDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ value: content, id: 1 });
  const result = await request;
  console.log('Notes saved to database.', result.value);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Retrieve all from the database');
  const notesDB = await openDB('jate', 1);
  const tx = notesDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result.value);
  return result?.value; // if result is undefined, stop and no not return undefined.value and return null
}

initdb();
