const express = require('express');
const { createNote, updateNote, 
    replaceNote, deleteNote,
     updateAllNotes,
    getPaginatedNotes,
    getNoteById,
    getNoteByContent,
    getNotesWithUser,
    aggregateNotes,
    deleteAllNotes } = require('../controllers/note.controller');

const router = express.Router();

router.post('/', createNote);

router.patch('/:noteId', updateNote);
router.put('/replace/:noteId', replaceNote);
router.delete('/:noteId', deleteNote);
router.patch('/all', updateAllNotes);
router.get('/paginate-sort', getPaginatedNotes);
router.get('/:id', getNoteById);
router.get('/note-by-content', getNoteByContent);
router.get('/note-with-user', getNotesWithUser);
router.get('/aggregate', aggregateNotes);
router.delete('/', deleteAllNotes);

module.exports = router;