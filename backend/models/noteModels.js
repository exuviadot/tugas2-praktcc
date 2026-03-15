const Notes = require('../schema/Notes');

const getAll = async (req, res) => {
    return await Notes.findAll({
        attributes: ['id', 'judul', 'isi'],
    });
};

const create = async (noteData) => {
    return await Notes.create(noteData);
};

const findById = async(id) => {
    return await Notes.findByPk(id, {
        attributes: ['id', 'judul', 'isi'],
    });
};

const updateById = async (id, noteData) => {
    return await Notes.update(noteData, {
        where: {
            id: id,
        },
    });
};

const deleteById = async (id, noteData) => {
    return await Notes.destroy({
        where: {
            id: id,
        },
    });
};

module.exports = {
    getAll,
    create,
    findById,
    updateById,
    deleteById,
};