const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db("schemes").where({id}).first();
}

function findSteps(id) {
    return db.select("steps.id", "steps.step_number", "steps.instructions", "schemes.scheme_name")
    .from("steps")
    .join("schemes", "steps.scheme_id", "schemes.id")
    .where('steps.scheme_id', id)
    .orderBy('steps.step_number');
}

function add(scheme) {
    return db('schemes').insert(scheme).then(ids => {
        return findById(ids[0]);
    })
}

function update(changes, id) {
    return db('schemes').where({id}).update(changes).then(ids => {
        return findById(id);
    })
}

function remove(id) {
    const deleted = findById(id);
    return db('schemes')
      .where('id', id)
      .del();
  }
  