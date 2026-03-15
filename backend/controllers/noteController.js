const noteModel = require('../models/noteModels');

const getAllNotes = async(req, res) => {
    try {
        const allNotesData = await noteModel.getAll();
        res.status(200).json({
            message: 'Notes retrived successfully',
            data: allNotesData,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving notes',
            error: error.message,
        });
    }
};

const createNote = async (req, res) => {
    const { judul, isi } = req.body;

    try {
        const newNote = await noteModel.create({ judul, isi });
        res.status(201).json({
            message: 'Note created successfully',
            data: newNote,
        });

    } catch (error) {
        res.status(400).json({
            message: 'Validation error',
            error: error.message,
        });
    }
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { judul, isi } = req.body;

    try {
        const note = await noteModel.findById(id);

        if(!note) {
            return res.status(404).json({
                message: 'Note not found',
            });
        }

        const updatedNote = await noteModel.updateById(id, { judul, isi });
        res.status(200).json({
            message: 'Note updated successfully',
            data: updatedNote,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error updating note',
            error: error.message,
        });
    }
};

const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await noteModel.findById(id);

        if(!note) {
            return res.status(404).json({
                message: 'Note not found',
            });
        }

        const deletedNote = await noteModel.deleteById(id);
        res.status(200).json({
            message: 'Note deleted successfully',
            data: deletedNote,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting note',
            error: error.message,
        });
    }
};

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
};