const noteService = require('../services/note.service');

async function createNote(req, res) {
    try {
        const userId = req.query.userId;
        const note = await noteService.createNote(userId, req.body);

        res.status(201).json({
            message: "Note created successfully",
            note
        });
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                error: error.message
            });
        }
        res.status(500).json({
            message: "Failed to create note",
            error: error.message
        });
    }
}


async function updateNote(req, res) {
    try {
        const userId = req.query.userId;
        const noteId = req.params.noteId;
        const note = await noteService.updateNote(userId, noteId, req.body);

        res.status(200).json({
            message: "Note updated successfully",
            note
        });
    } catch (error) {
        console.error(error);
        if (error.message === "Note not found" || error.message === "Invalid note ID") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.startsWith("Forbidden")) {
            return res.status(403).json({ message: error.message });
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation failed", error: error.message });
        }
        res.status(500).json({ message: "Failed to update note", error: error.message });
    }
}

async function replaceNote(req, res) {
    try {
        const userId = req.query.userId;
        const noteId = req.params.noteId;
        const note = await noteService.replaceNote(userId, noteId, req.body);

        res.status(200).json({
            message: "Note replaced successfully",
            note
        });
    } catch (error) {
        console.error(error);
        if (error.message === "Note not found" || error.message === "Invalid note ID") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.startsWith("Forbidden")) {
            return res.status(403).json({ message: error.message });
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation failed", error: error.message });
        }
        res.status(500).json({ message: "Failed to replace note", error: error.message });
    }
}

async function deleteNote(req, res) {
    try {
        const userId = req.query.userId;
        const noteId = req.params.noteId;
        await noteService.deleteNote(userId, noteId);

        res.status(200).json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.error(error);
        if (error.message === "Note not found" || error.message === "Invalid note ID") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.startsWith("Forbidden")) {
            return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: "Failed to delete note", error: error.message });
    }
}


async function updateAllNotes(req, res) {
    try {
        const userId = req.query.userId;
        const { title } = req.body;
        const result = await noteService.updateAllNotesTitle(userId, title);

        res.status(200).json({
            message: "All notes updated successfully",
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation failed", error: error.message });
        }
        res.status(500).json({ message: "Failed to update notes", error: error.message });
    }
}

async function getPaginatedNotes(req, res) {
    try {
        const userId = req.query.userId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const { notes, total } = await noteService.getPaginatedNotes(userId, page, limit);

        res.status(200).json({
            message: "Notes retrieved successfully",
            page,
            limit,
            total,
            notes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get notes", error: error.message });
    }
}

async function getNoteById(req, res) {
    try {
        const userId = req.query.userId;
        const noteId = req.params.id;
        const note = await noteService.getNoteById(userId, noteId);

        res.status(200).json({
            message: "Note found",
            note
        });
    } catch (error) {
        console.error(error);
        if (error.message === "Note not found" || error.message === "Invalid note ID") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.startsWith("Forbidden")) {
            return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: "Failed to get note", error: error.message });
    }
}

async function getNoteByContent(req, res) {
    try {
        const userId = req.query.userId;
        const content = req.query.content;
        const note = await noteService.getNoteByContent(userId, content);

        res.status(200).json({
            message: "Note found",
            note
        });
    } catch (error) {
        console.error(error);
        if (error.message === "Note not found") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Failed to get note", error: error.message });
    }
}

async function getNotesWithUser(req, res) {
    try {
        const userId = req.query.userId;
        const notes = await noteService.getNotesWithUser(userId);

        res.status(200).json({
            message: "Notes retrieved successfully",
            count: notes.length,
            notes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get notes", error: error.message });
    }
}

async function aggregateNotes(req, res) {
    try {
        const userId = req.query.userId;
        const title = req.query.title;
        const notes = await noteService.aggregateNotes(userId, title);

        res.status(200).json({
            message: "Aggregation completed successfully",
            count: notes.length,
            notes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to aggregate notes", error: error.message });
    }
}

async function deleteAllNotes(req, res) {
    try {
        const userId = req.query.userId;
        const result = await noteService.deleteAllNotes(userId);

        res.status(200).json({
            message: "All notes deleted successfully",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete notes", error: error.message });
    }
}

module.exports = {
     createNote,
     updateNote,
     replaceNote,
     deleteNote,
     updateAllNotes,
     getPaginatedNotes,
     getNoteById,
     getNoteByContent,
     getNotesWithUser,
     aggregateNotes,
     deleteAllNotes
    };