const Note = require('../models/note.model');
const mongoose = require('mongoose')


async function createNote(userId, noteData) {
    const note = new Note({
        ...noteData,
        userId: userId
    });
    return await note.save();
}

async function updateNote(userId, noteId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        throw new Error("Invalid note ID");
    }
    const note = await Note.findById(noteId);
    if (!note) {
        throw new Error("Note not found");
    }
    if (note.userId.toString() !== userId) {
        throw new Error("Forbidden: You are not the owner of this note");
    }
    const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { $set: updateData },
        { new: true, runValidators: true }
    );
    return updatedNote;
}

async function replaceNote(userId, noteId, newData) {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        throw new Error("Invalid note ID");
    }
    const note = await Note.findById(noteId);
    if (!note) {
        throw new Error("Note not found");
    }
    if (note.userId.toString() !== userId) {
        throw new Error("Forbidden: You are not the owner of this note");
    }
    const replacedNote = await Note.findByIdAndUpdate(
        noteId,
        newData,
        { new: true, runValidators: true }
    );
    return replacedNote;
}

async function deleteNote(userId, noteId) {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        throw new Error("Invalid note ID");
    }
    const note = await Note.findById(noteId);
    if (!note) {
        throw new Error("Note not found");
    }
    if (note.userId.toString() !== userId) {
        throw new Error("Forbidden: You are not the owner of this note");
    }
    const deletedNote = await Note.findByIdAndDelete(noteId);
    return deletedNote;
}



async function updateAllNotesTitle(userId, newTitle) {
    const result = await Note.updateMany(
        { userId: userId },
        { $set: { title: newTitle } },
        { runValidators: true }
    );
    return result;
}

async function getPaginatedNotes(userId, page, limit) {
    const skip = (page - 1) * limit;
    const notes = await Note.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    const total = await Note.countDocuments({ userId });
    return { notes, total };
}

async function getNoteById(userId, noteId) {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        throw new Error("Invalid note ID");
    }
    const note = await Note.findById(noteId);
    if (!note) {
        throw new Error("Note not found");
    }
    if (note.userId.toString() !== userId) {
        throw new Error("Forbidden: You are not the owner of this note");
    }
    return note;
}

async function getNoteByContent(userId, content) {
    const note = await Note.findOne({ userId, content });
    if (!note) {
        throw new Error("Note not found");
    }
    return note;
}

async function getNotesWithUser(userId) {
    return await Note.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $project: {
                title: 1,
                userId: 1,
                createdAt: 1,
                email: "$user.email"
            }
        }
    ]);
}

async function aggregateNotes(userId, title) {
    const matchStage = { userId: new mongoose.Types.ObjectId(userId) };
    if (title) {
        matchStage.title = { $regex: title, $options: "i" };
    }
    return await Note.aggregate([
        { $match: matchStage },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $project: {
                title: 1,
                content: 1,
                createdAt: 1,
                name: "$user.name",
                email: "$user.email"
            }
        }
    ]);
}

async function deleteAllNotes(userId) {
    const result = await Note.deleteMany({ userId });
    return result;
}

module.exports = {
    createNote,
    updateNote,
    replaceNote,
    deleteNote,
    updateAllNotesTitle,
    getPaginatedNotes,
    getNoteById,
    getNoteByContent,
    getNotesWithUser,
    aggregateNotes,
    deleteAllNotes

 };